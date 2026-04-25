import React from "react";
import { useContacts } from "../context/ContactContext.jsx";
import ContactCard from "../components/ContactCard";

const Home = () => {
    const { contacts, loading } = useContacts();

    if (loading) return <p>Cargando contactos...</p>;

    return (
        <div>
            <h2 className="mb-3">Contactos</h2>
            {contacts.length === 0 ? (
                <p>No hay contactos todavía.</p>
            ) : (
                contacts.map((c) => <ContactCard key={c.id} contact={c} />)
            )}
        </div>
    );
};

export default Home;
