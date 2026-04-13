// pages/Single.jsx
import React, { useContext, useState } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { useLocation, useNavigate } from "react-router-dom";

const Single = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const editing = location.state !== null;
    const contact = location.state;

    const [form, setForm] = useState({
        name: editing ? contact.name : "",
        phone: editing ? contact.phone : "",
        email: editing ? contact.email : "",
        address: editing ? contact.address : ""
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        if (editing) {
            actions.updateContact(contact.id, form);
        } else {
            actions.addContact(form);
        }
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h1>{editing ? "Editar Contacto" : "Añadir Contacto"}</h1>

            <input className="form-control my-2" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
            <input className="form-control my-2" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} />
            <input className="form-control my-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className="form-control my-2" name="address" placeholder="Dirección" value={form.address} onChange={handleChange} />

            <button className="btn btn-primary" onClick={handleSubmit}>
                {editing ? "Actualizar" : "Crear"}
            </button>
        </div>
    );
};

export default Single;
