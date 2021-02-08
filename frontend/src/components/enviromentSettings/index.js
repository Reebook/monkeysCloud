import React from 'react';
import './style.scss';
import BackupSettings from './BackupSettings';
import HostSettings from './HostSettings';
import Settings from './Settings';
export default function EnviromentSettings(){
    return(
        <div>
        <div className="enviroment-container">
            <section className="section-header">
            <div className="container-section">
            <div>
            <h5 className="title">Enviroments</h5>
            <h5 className="title"> Settings</h5>
            </div>

            <div>
            <ul className="package">
             <li>Free</li>
             <li>Company name</li>
             <li>Node + React.js</li>
            </ul>
            </div>
            <div>
            <button className="button">Edit package enviroment</button>
            </div>
           
            </div>
            
            </section>
        
        </div>
        <Settings/>
        <div className="enviroments-container">
        <BackupSettings/>
        <HostSettings/>
        </div>
        
        </div>
    );

}