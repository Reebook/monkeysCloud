import React, { memo, useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useHistory, Link } from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

// Local
import "./style.scss";

// Components
import Avatar from "../avatar";
import Iconconfig from "../configicon";
import SearchFilter from "./SearchFilter";
//estilo alert Notifications
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      
    },
  },
  badge:{
    right: '0.5em'
  },

}))

function Navbar() {
  // const sampleData = [
  //   { id: 1, first_name: "Aron", last_name: "Paisley", gender: "male" },
  //   { id: 1, first_name: "Nerissa", last_name: "Millhouse", gender: "female" },
  //   { id: 1, first_name: "Michael", last_name: "Schank", gender: "male" },
  //   { id: 1, first_name: "Velma", last_name: "Laiche", gender: "female" },
  // ];

  const [showSearchBox, setSearchBox] = useState(false);
  const onClick = () => setSearchBox(!showSearchBox);
  const classes = useStyles();
  return (
    <nav className="monkeys-nav">
      <Link to="/" className="logo-container">

        <span className="logo-partone">MONKEY'S</span>
        <span className="logo-parttwo">CLOUD</span>

      </Link>
      {/*/!*<SearchFilter />*!/*/}
      <div className="searchContainer">
        {showSearchBox ? <SearchFilter /> : null}
      </div>
      <div className="navbar-icons">
        <FaSearch className="nav-icon" value="Search" onClick={onClick} />
        {/*<input type="submit" value="Search" onClick={onClick} />*/}
        
        <Iconconfig className="nav-icon" />
        <div  className={classes.root}>
        <Badge badgeContent={5} color="secondary" className={classes.badge}>
        <FaBell className="nav-icon-notification"/>
    
        </Badge>
        </div>
        <Avatar className="nav-avatar" />
      </div>
    </nav>
  );
}

export default memo(Navbar);
