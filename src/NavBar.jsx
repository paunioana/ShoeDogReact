import React from "react";
import {Link} from "react-router-dom";



const NavBar = (props) => {
    const linkStyle = {
        border: "1px solid #aaaaaa",
        padding: "4px",
        borderRadius: "4px",
        marginLeft: "4px",
        marginRight: "4px",
    };
    return (
        <div style={{padding: "8px"}}>
            <Link style={linkStyle} to="/register">
                Register
            </Link>
            <Link style={linkStyle} to="/login">
                Login
            </Link>
        </div>
    );
};

export default NavBar;