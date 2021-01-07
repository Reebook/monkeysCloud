import React, {useState, useMemo, useEffect} from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';

//Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//antd-img-crop
/* import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd'; */

import './style.scss';

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

        axios.post('http://localhost:1337/Task/Create', form)
            .then(res => {                                
                console.log('Done!', res.data);
            })
            .catch(error => console.log(error));
    }        

    return(
        <div className="main-container  popup-box">
            <div className="boxContent">
                <h3 className="header-page">Create Issue</h3>
                <form id="dataForm" onSubmit={handleSubmit}>
                    <div className="form-container">                                        
                        <div className="input-divider">
                            <label className="title-control">Projects</label>
                            <label className="title-control">Issue type</label>
                            <label className="title-control">Priority</label>                                                
                        </div>                                    
                        <div className="input-divider">                                                
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
                                <MenuItem value={"Highest"}><FaArrowUp style={{color:'#e60000'}} className="priority-style"/>Highest</MenuItem>
                                <MenuItem value={"High"}><FaArrowUp style={{color:'#ff6666'}} className="priority-style"/>High</MenuItem>
                                <MenuItem value={"Medium"}><FaArrowUp style={{color:'#ff751a'}} className="priority-style"/>Medium</MenuItem>
                                <MenuItem value={"Low"}><FaArrowDown style={{color:'#008000'}} className="priority-style"/>Low</MenuItem>
                                <MenuItem value={"Lowest"}><FaArrowDown style={{color:'#47d147'}} className="priority-style"/>Lowest</MenuItem>
                            </Select> 
                        </div>                    
                        <p className="description">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
                        <hr/> 
                        <div className="input-divider">
                            <label className="title-control">Summary</label>                                                        
                        </div>                   
                        <div className="input-divider">                        
                            <input type="text" className="form-control" autoComplete="off" value={form.summary} name="summary" onChange={handleFormChange}/>
                        </div>
                        <div className="input-divider">
                            <label className="title-control">Component</label>                                                        
                        </div>
                        <div className="input-divider">                                                                            
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
                        <div className="input-divider">
                            <label className="title-control">Attachment</label>                                                        
                        </div>           

                        <section className="input-divider">
            
                        </section>

                        <div className="input-divider">
                            <label className="title-control">Description</label>                                                        
                        </div>                   
                        <div className="input-divider">
                            <textarea name="description" className="form-control" rows="10" value={form.description} onChange={handleFormChange}></textarea>
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