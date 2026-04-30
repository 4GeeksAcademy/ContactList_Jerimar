// src/pages/Home.jsx
import React, { useState } from "react";
import { useContacts } from "../context/ContactContext.jsx";
import ContactCard from "../components/ContactCard.jsx";

const Home = () => {
    const {
        agendas,
        selectedAgenda,
        contacts,
        loading,
        selectAgenda,
        createAgenda,
    } = useContacts();

    const [newAgenda, setNewAgenda] = useState("");

    const handleCreateAgenda = async (e) => {
        e.preventDefault();
        if (!newAgenda.trim()) return;
        await createAgenda(newAgenda.trim());
        setNewAgenda("");
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Agendas</h1>

            {/* Crear nueva agenda */}
            <form className="mb-3 d-flex gap-2" onSubmit={handleCreateAgenda}>
                <input
                    className="form-control"
                    placeholder="Nombre de nueva agenda (ej: Jesus_agenda)"
                    value={newAgenda}
                    onChange={(e) => setNewAgenda(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    Crear agenda
                </button>
            </form>

            {/* Lista de agendas */}
            <div className="mb-4">
                {agendas.length === 0 && <p>No hay agendas todavía.</p>}
                {Array.isArray(agendas) && agendas.map((a) => (
    <button
        key={a.slug}
        className="btn btn-outline-secondary me-2 mb-2"
        onClick={() => selectAgenda(a.slug)}
    >
        {a.slug}
    </button>
))}
            </div>

            <hr />

            {/* Contactos de la agenda seleccionada */}
            <h2 className="mb-3">
                {selectedAgenda
                    ? `Contactos de: ${selectedAgenda}`
                    : "Selecciona una agenda para ver sus contactos"}
            </h2>

            {loading && <p>Cargando contactos...</p>}

            {!loading && selectedAgenda && contacts.length === 0 && (
                <p>No hay contactos en esta agenda.</p>
            )}

            {!loading &&
                selectedAgenda &&
                contacts.map((c) => <ContactCard key={c.id} contact={c} />)}
        </div>
    );
};

export default Home;
