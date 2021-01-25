import React, { forwardRef } from "react";
import { Link } from 'react-router-dom'
import "./style.scss";
import { FaExternalLinkAlt } from "react-icons/fa";

const UserSettings = forwardRef((props, ref) => {
  return (
    <nav className="menu" ref={ref} style={{zIndex: 4}}>
      <ul className="monkeys-menu-container" >
        <li className="monkeys-p-2 pointer"><Link to="/user/details" className='text-link'>Profile</Link></li>
        <li className="monkeys-p-2 pointer d-flex align-items-center">
          <span>Account Settings</span>
          <div className="monkeys-ml-2">
            <FaExternalLinkAlt />
          </div>
        </li>
        <li className="monkeys-p-2 pointer">
          <hr />
        </li>
        <li className="monkeys-p-2 pointer">Logout</li>
      </ul>
    </nav>
  );
});

export default UserSettings;
