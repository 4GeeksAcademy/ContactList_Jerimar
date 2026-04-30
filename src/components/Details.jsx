import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/ContactContext.jsx";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { contacts, createContact, updateContact } = useContacts();

    const isNew = id === "new";

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (!isNew) {
            const existing = contacts.find((c) => c.id === Number(id));
            if (existing) setForm(existing);
        }
    }, [id, isNew, contacts]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isNew) await createContact(form);
        else await updateContact(Number(id), form);

        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>{isNew ? "Agregar contacto" : "Editar contacto"}</h2>

            <form onSubmit={handleSubmit} className="row g-3 mt-3">
                <div className="col-12">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
                </div>

                <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input className="form-control" name="address" value={form.address} onChange={handleChange} />
                </div>

                <div className="col-12 d-flex gap-2">
                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate("/")}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default Details;