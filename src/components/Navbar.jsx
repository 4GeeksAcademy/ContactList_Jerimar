// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Contact App</Link>
        </nav>
    );
};

export default Navbar;
