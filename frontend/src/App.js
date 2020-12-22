import Axios from 'axios';
import React, { useEffect } from 'react';
import Router from './containers/router';
    
function App() {
  // var axios = require('axios');

  // var config = {
  //   method: 'get',
  //   url: 'http://sailsjs:1337/User/Read/1',
  //   // headers: {
  //   //   Cookie:
  //   //     'sails.sid=s%3AwcCdJfU1-ajehetKxXh_YCAvnTVq-R7t.0zXjXyaMzSoDDIDeQe9s7ZWjzml0kB7SXQsFnXo%2BO0s',
  //   // },
  // };
  
  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   }); 
  var axios = require('axios');
  axios({
        method: 'GET',
        // headers: {     
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        //   "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //   "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        // },
          
        url: 'http://localhost:1337/User/Read/1',
      }).then(function (response) {
        console.log(response.data);
  });

  

  return <Router />;
}
export default App;
