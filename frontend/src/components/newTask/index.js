import React, { useState, useMemo, useEffect, memo } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import axios from 'axios';

import './style.scss';
import AppButton from '../form/button';
import AppForm from '../form/appForm';
import AppInput from '../form/appInput';
import AppTextArea from '../form/appTextArea';
import AppSelect from '../form/appSelect';
import modalStyles from '../../utils/modalStyles';
import priorities from '../../utils/priorities';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#aeafb1',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  fontWeight: '300',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '20px',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const width = 300;

const NewTask = ({ closeModal, openModal }) => {
  const [projects, setProjects] = useState([]);
  const [components, setComponents] = useState([]);
  const [files, setFiles] = useState([]);

  const [form, setForm] = useState({
    relatedProject: '',
    isEpic: '',
    priority: '',
    summary: '',
    component: '',
    attachment: '',
    description: '',
  });

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    getProjects();
    getComponents();
  }, []);

  const getProjects = () => {
    axios
      .get('http://localhost:1337/User/CreatedProjects/1')
      .then(res => {
        const allProjects = res.data.createdProject;
        setProjects(allProjects); //add projects to the hook
      })
      .catch(error => console.log(error));
  };

  const getComponents = () => {
    axios
      .get('http://localhost:1337/Component/ReadAll')
      .then(res => {
        const allComponents = res.data;
        setComponents(allComponents);
      })
      .catch(error => console.log(error));
  };

  const handleFormChange = event => {
    // use spread operator
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(form);

    axios
      .post('http://localhost:1337/Task/Create', form)
      .then(res => {
        console.log('Done!', res.data);
      })
      .catch(error => console.log(error));
  };
  console.log(Object.keys(priorities).map(i => ({ value: i, name: priorities[i].name })));

  return (
    <Modal onRequestClose={closeModal} isOpen={openModal} style={modalStyles} ariaHideApp={false}>
      <div className='modal new-task'>
        <AppForm initialValues={defaultState}>
          <h3 className='create-issue'>Create Issue</h3>

          <AppSelect width={width} options={projects} empty={false} name='project' property='name' />
          <AppSelect width={width} options={types} empty={false} label='issue type' name='isEpic' property='value' />
          <p className='description'>
            Some issue types are unavailable due to incompatible field configuration and/or workflow associations.
          </p>
          <hr />
          <AppInput name='summary' label='Summary' />
          <AppSelect width={width} options={components1} name='components' />
          <AppSelect
            width={width}
            property='value'
            options={Object.keys(priorities).map(i => ({ ...priorities[i] }))}
            name='priority'
          />
          <section className='upload-container'>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} name='attachment' value={form.attachment} onChange={handleFormChange} />
              <p style={{ color: '#aeafb1' }}>
                Drop files here to attach, or{' '}
                <a href='#' style={{ color: '#0759bd' }}>
                  browse
                </a>
              </p>
              <aside style={thumbsContainer}>{thumbs}</aside>
            </div>
          </section>
          <AppTextArea label='Description' name='description' />

          <div className='modal__button-container'>
            <span className='new-one'>
              <input type='checkbox' />
              Create another
            </span>
            <AppButton title='Create' />
            <button className='cancel' onClick={closeModal}>
              Cancel
            </button>
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const defaultState = {
  relatedProject: '',
  isEpic: '',
  priority: 3,
  summary: '',
  component: '',
  attachment: '',
  description: '',
};

const types = [
  { name: 'Task', value: false },
  { name: 'Epic', value: true },
];

const components1 = [
  { name: 'Task', id: 1 },
  { name: 'Epic', id: 2 },
];

export default memo(NewTask);
