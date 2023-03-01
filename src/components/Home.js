import React from "react";
import { Link, useLocation } from "react-router-dom";
 
const Home = () => {
    const location = useLocation();
    const userID = new URLSearchParams(location.search).get("userID");

    return (
        <div>
            <Link to="about">Click to view our about page</Link>
            <h1>Hello, {userID}!</h1>
            <p>Home page</p>
        </div>
    );
};
 
export default Home;