import React from 'react';
import './style.scss';

export default function HostSettings(){
    return(
      <div className="hosts-container">
          <h2>Hosts</h2>
          <div className="list-container">
          <ul className="list">
              <li>name</li>
              <li>name</li>
              <li>name</li>
          </ul>
          <ul className="list">
              <li>url</li>
              <li>url</li>
              <li>url</li>
          </ul>
          <ul className="list">
              <li>config</li>
              <li>config</li>
              <li>config</li>
          </ul>
          </div>
          <div className="options">
              <button className="create-host">Create Host</button>
          </div>
      </div>
    )
}