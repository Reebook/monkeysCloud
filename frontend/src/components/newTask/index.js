import React, {useState, useCallback, useEffect} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {useDropzone} from 'react-dropzone';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './style.scss';

const handleSubmit = event => {
    event.preventDefault();
}

const NewTask = (props) =>{
    const [projects, setProjects] = useState([]);
    const [components, setComponents] = useState([]);
    
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
                            <select className="divided-control" name="project">
                                {
                                    projects.map((project, index) => (
                                        <option key={index} value={project.id}>{project.name}</option>
                                    ))
                                }
                            </select>                        
                            <select className="divided-control" name="type">
                                <option value="false">Task</option>
                                <option value="true">Epic</option>
                            </select>                        
                            <select className="divided-control" name="priority">                            
                                <option value="High">Highest </option>
                                <option value="High">High ↑</option>
                                <option value="Medium">Medium ↑</option>
                                <option value="Low">Low ↓</option>
                                <option value="Low">Lowest ↓ </option>
                            </select>      
                        </div>                    
                        <p className="description">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
                        <hr/>                    
                        <div className="input-divider">                        
                            <input type="text" className="form-control" placeholder="Summary" name="summary"/>                                                                      
                        </div>
                        <div className="input-divider">                                                
                            <select className="form-control" name="components">
                                {
                                    components.map((component, index) => (
                                        <option value={component.id} key={index}>{component.name}</option>
                                    ))
                                }
                            </select>                                                                    
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