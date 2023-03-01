import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom" 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

//const searchParams = new URLSearchParams(window.location.search);
//const userID = searchParams.get('userID');
//console.log(userID);
 
// if (userID === null) {
//   alert("Please provide a userID parameter in the URL.");
// }
// else{
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );
// }

