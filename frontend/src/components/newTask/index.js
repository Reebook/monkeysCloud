import React, {useState, useCallback, useEffect} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {useDropzone} from 'react-dropzone';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

//Material UI

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

//Material UI

import './style.scss';

const handleSubmit = event => {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  selectControl: {
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const NewTask = (props) =>{
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [components, setComponents] = useState([]);   
    const [selectedComponentt, setSelectedComponent] = useState('');
    const [priority, setPriority] = useState('');
    const [typeTask, setTypeTask] = useState('');
    const [summary, setSummary] = useState('');

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

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));                

    const changePriority = (event) => {
        setPriority(event.target.value);
    };

    const changeTask = (event) => {
        setTypeTask(event.target.value);
    };

    const changeProject = (event) => {
        setSelectedProject(event.target.value);
    };

    const changeSummary = (event) => {
        setSummary(event.target.value);
    };
    
    const changeComponent = (event) => {
        setSelectedComponent(event.target.value);
    };
    
    

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
                            <Select className="divided-control"                            
                                id="project"
                                value={selectedProject}
                                onChange={changeProject}
                            >                  
                                {
                                    projects.map((project, index) => (
                                        <MenuItem key={index} value={project.id}>{project.name}</MenuItem>
                                    ))
                                }                                                                                                  
                                
                            </Select>                                                 
                            <Select className="divided-control"                            
                                id="taskPriority"
                                value={typeTask}
                                onChange={changeTask}
                            >                                                    
                                <MenuItem value={1}>Task</MenuItem>
                                <MenuItem value={2}>Epic</MenuItem>
                                
                            </Select>                                                                             
                            <Select className="divided-control"                            
                                id="taskPriority"
                                value={priority}
                                onChange={changePriority}
                            >                                                    
                                <MenuItem value={1}><FaArrowUp style={{color:'#e60000'}} className="priority-style"/>Highest</MenuItem>
                                <MenuItem value={2}><FaArrowUp style={{color:'#ff6666'}} className="priority-style"/>High</MenuItem>
                                <MenuItem value={3}><FaArrowUp style={{color:'#ff751a'}} className="priority-style"/>Medium</MenuItem>
                                <MenuItem value={4}><FaArrowDown style={{color:'#008000'}} className="priority-style"/>Low</MenuItem>
                                <MenuItem value={5}><FaArrowDown style={{color:'#47d147'}} className="priority-style"/>Lowest</MenuItem>
                            </Select> 
                        </div>                    
                        <p className="description">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
                        <hr/>                    
                        <div className="input-divider">                        
                            <input type="text" className="form-control" placeholder="Summary" value={summary} name="summary" onChange={changeSummary}/>
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
                                value={selectedComponentt}
                                onChange={changeComponent}
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
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <h4 className="lb-description">Attachment</h4>
                                <p style={{color:"#aeafb1"}}>Drop files here to attach, or <a href="#" style={{color:"#0759bd"}}>browse</a></p>
                            </div>
                            {/* <div className="uploaded-files">
                                <h4>Files</h4>
                                <ul>{files}</ul>
                            </div> */}
                        </section>
                        
                        {/* 
                            Ending of DropZone section
                        */}
                        <div className="input-divider" style={{width: "97%", margin: "2px auto"}}>                    
                            <SunEditor
                                name='description'                            
                                height='250'                        
                                placeholder='Please add your content here...'                                              
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <span className="span"><input type="checkbox" style={{marginRight: "2px"}}/>Create another</span>
                        <button type="submit" className="submit-button">Create</button>
                        <button className="cancel" onClick={props.handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewTask;