import React from 'react';
import './style.scss';

export default function Settings(){
    return(
        <div className="settings-container">
           <div className="list-container">
               <ul className="list">
                 <li>Name(link)</li>
                 <li>name example</li>
               </ul>
                
                <ul className="list">
                <li>Type</li>
                 <li>python</li>  
                </ul>

                <ul  className="list">
                   <li>Permisions</li>
                   <li>view user And roles</li>
                   <li>new screen</li>
                </ul>

                <ul  className="list">
                   <li>Git</li>
                   <li>URL Git</li>
                   <li>edit</li>
                </ul>

                <ul  className="list">
                <li>Actions</li>
                   <li>Edit</li>
                   <li>Delete</li>
                </ul>

           </div>
        </div>
    );
}