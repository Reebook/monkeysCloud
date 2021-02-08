import React from 'react';
import './style.scss';

export default function BackupSettings(){
    return(
      <div className="backup-container">
        <h2>Backup</h2>
        <div className="list-container">
        <ul className="list">
            <li>Date Last Backup</li>
            <li>Date Last Backup</li>
            <li>Date Last Backup</li>
        </ul>
        <ul className="list">
            <li>Link Download</li>
            <li>Link Download</li>
            <li>Link Download</li>
        </ul>
        </div>
        <div className="options">
            <a href="">View All</a>
            <button className="create-backup">Create Backup</button>
        </div>
      </div>
    )

}