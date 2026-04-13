// pages/Home.jsx
import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h1>Lista de Contactos</h1>

            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/single")}
            >
                ➕ Añadir Contacto
            </button>

            {store.contacts.length === 0 ? (
                <p>No hay contactos aún.</p>
            ) : (
                store.contacts.map((c) => (
                    <ContactCard
                        key={c.id}
                        contact={c}
                        onDelete={() => actions.deleteContact(c.id)}
                        onEdit={() => navigate("/single", { state: c })}
                    />
                ))
            )}
        </div>
    );
};

export default Home;
