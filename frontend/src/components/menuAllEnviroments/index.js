import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    minHeight:31,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color:'#93c0f8'
  },
  items:{
    color:'#93c0f8'
  },
  devEnviroment:{
    minWidth: 140,
    minHeight:31,
    position:'absolute',
    top:25,
    color:'#95a9f7',
    borderRadius:4,
    border:"solid 2px #2855ff"

  }
}));
export default function MenuAllEnviroments(){
    const classes = useStyles();
  const [Enviroment, setEnviroment] = React.useState('');

  const handleChange = (event) => {
    setEnviroment(event.target.value);
  };
  return(
    <div>
    <FormControl className={classes.formControl}>
    <Select
      value={Enviroment}
      onChange={handleChange}
      displayEmpty
      className={classes.selectEmpty}
     
   
    >
      <MenuItem value="" className={classes.items}>
        <em>All Enviroment</em>
      </MenuItem>
      <MenuItem value={"Dev"}  className={classes.items}>Dev</MenuItem>
      <MenuItem value={"Test"} className={classes.items}>Test</MenuItem>
      <MenuItem value={"Live"} className={classes.items}>Live</MenuItem>
    </Select>
    
  </FormControl>
  <button className={classes.devEnviroment}>Dev Enviroment</button>

    </div>
    
  )
}