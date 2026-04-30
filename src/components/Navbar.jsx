import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Contact List</Link>
        <Link className="btn btn-success" to="/details/new">Agregar</Link>
    </nav>
);

export default Navbar;
