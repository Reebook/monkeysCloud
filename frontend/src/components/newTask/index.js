import React, {useState, useMemo, useEffect} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {useDropzone} from 'react-dropzone';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; */
import axios from 'axios';

//Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//Material UI

import './style.scss';



const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
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
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
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
  lineHeight: '20px'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const NewTask = (props) =>{
    const [projects, setProjects] = useState([]);
    const [components, setComponents] = useState([]);   

    const [form, setForm] = useState({
        relatedProject: '',
        isEpic: '',
        priority: '',
        summary: '',
        component: '',
        attachment: '',
        description: ''
    });


    useEffect(() => {
        getProjects();
        getComponents();
    }, []);

    const getProjects = ()=>{
        axios.get('http://localhost:1337/User/CreatedProjects/1')
            .then(res => {        
                const allProjects = res.data.createdProject;                
                setProjects(allProjects); //add projects to the hook
            })
            .catch(error => console.log(error));       
    };

    const getComponents = ()=> {
        axios.get('http://localhost:1337/Component/ReadAll')
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

        /* axios.post('http://localhost:1337/Task/Create', form)
            .then(res => {
                console.log('Done!', res.data);
            })
            .catch(error => console.log(error)); */
    }

    const [files, setFiles] = useState([]);    

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject, isDragAccept]);

    

    
    /* const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        }
    }); */

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
            <img
            src={file.preview}
            style={img}
            />
        </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
        

    return(
        <div className="main-container  popup-box">
            <div className="boxContent">
                <h3 className="header-page">Create Issue</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">                                        
                        <div className="input-divider">
                            <label className="title-control">Projects</label>
                            <label className="title-control">Issue type</label>
                            <label className="title-control">Priority</label>                                                
                        </div>                                    
                        <div className="input-divider">                                                
                            {/* <select className="divided-control" name="project">
                                {
                                    projects.map((project, index) => (
                                        <option key={index} value={project.id}>{project.name}</option>
                                    ))
                                }
                            </select> */}
                            <Select className={"divided-control"}                            
                                id="project"
                                name="relatedProject"
                                value={form.relatedProject}
                                onChange={handleFormChange}
                            >                  
                                {
                                    projects.map((project, index) => (
                                        <MenuItem key={index} value={project.id}>{project.name}</MenuItem>
                                    ))
                                }                                                                                                  
                                
                            </Select>                                                 
                            <Select className={"divided-control"}
                                id="taskPriority"
                                name="isEpic"
                                value={form.isEpic}
                                onChange={handleFormChange}
                            >                                                    
                                <MenuItem value={false}>Task</MenuItem>
                                <MenuItem value={true}>Epic</MenuItem>
                                
                            </Select>                                                                             
                            <Select className={"divided-control"}
                                id="taskPriority"
                                name="priority"
                                value={form.priority}
                                onChange={handleFormChange}
                            >                                                    
                                <MenuItem value={"Highest"}><FaArrowUp style={{color:'#e60000' }} className="priority-style"/>Highest</MenuItem>
                                <MenuItem value={"High"}><FaArrowUp style={{color:'#ff6666'}} className="priority-style"/>High</MenuItem>
                                <MenuItem value={"Medium"}><FaArrowUp style={{color:'#ff751a'}} className="priority-style"/>Medium</MenuItem>
                                <MenuItem value={"Low"}><FaArrowDown style={{color:'#008000'}} className="priority-style"/>Low</MenuItem>
                                <MenuItem value={"Lowest"}><FaArrowDown style={{color:'#47d147'}} className="priority-style"/>Lowest</MenuItem>
                            </Select> 
                        </div>                    
                        <p className="description">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
                        <hr/>                    
                        <div className="input-divider">                        
                            <input type="text" className="form-control" placeholder="Summary" value={form.summary} name="summary" onChange={handleFormChange}/>
                        </div>
                        <div className="input-divider">                                                
                            {/* <select className="form-control" name="components">
                                {
                                    components.map((component, index) => (
                                        <option value={component.id} key={index}>{component.name}</option>
                                    ))
                                }
                            </select>   */}    
                            <Select className="form-control"                            
                                id="component"
                                name="component"
                                value={form.component}
                                onChange={handleFormChange}
                            >                  
                                {
                                    components.map((component, index) => (
                                        <MenuItem key={index} value={component.id}>{component.name}</MenuItem>
                                    ))
                                }                                                                                                                                  
                            </Select> 

                        </div>
                        {/* <div className="input-divider">                                            
                            <input type="text" className="form-control" placeholder="Attachment" name="summary"/>
                        </div> */}
                        
                        {/* 
                            Begining of DropZone section
                        */}


                        <section className="upload-container">
                            <div {...getRootProps({style})}>
                                <input {...getInputProps()} />                                
                                <p style={{color:"#aeafb1"}}>Drop files here to attach, or <a href="#" style={{color:"#0759bd"}}>browse</a></p>
                                <aside style={thumbsContainer}>
                                    {thumbs}
                                </aside>
                            </div>                            
                        </section>


                        {/* <section className="upload-container">                        
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <h4 className="lb-description">Attachment</h4>
                                <p style={{color:"#aeafb1"}}>Drop files here to attach, or <a href="#" style={{color:"#0759bd"}}>browse</a></p>
                            </div>
                            <div className="uploaded-files">
                                <h4>Files</h4>
                                <ul>{files}</ul>
                            </div> 
                        </section> */}
                        
                        {/* 
                            Ending of DropZone section
                        */}
                        <div className="input-divider" style={{width: "97%", margin: "2px auto"}}>                    
                            <SunEditor
                                name='description'                            
                                height='250'                        
                                placeholder='Please add your content here...'
                                value={form.description}                                             
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <span className="span"><input type="checkbox" style={{marginRight: "2px"}}/>Create another</span>
                        <button className="submit-button">Create</button>
                        <button className="cancel" onClick={props.handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewTask;