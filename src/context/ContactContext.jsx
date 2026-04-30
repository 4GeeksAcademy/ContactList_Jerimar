// src/context/ContactContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const API = "https://playground.4geeks.com/contact";

const ContactContext = createContext();
export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
    const [agendas, setAgendas] = useState([]);
    const [selectedAgenda, setSelectedAgenda] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

const loadAgendas = async () => {
    try {
        const resp = await fetch(`${API}/agendas?offset=0&limit=100`);
        const data = await resp.json();

        setAgendas(data.agendas || []); // ← AQUÍ ESTÁ LA SOLUCIÓN
    } catch (error) {
        console.error("Error cargando agendas:", error);
        setAgendas([]);
    }
};

    // 🔹 Crear una agenda nueva
    const createAgenda = async (slug) => {
        try {
            await fetch(`${API}/agendas/${slug}`, {
                method: "POST",
            });
            await loadAgendas();
        } catch (error) {
            console.error("Error creando agenda:", error);
        }
    };

    // 🔹 Cargar contactos de una agenda concreta
    const loadContacts = async (agendaSlug) => {
        if (!agendaSlug) return;
        setLoading(true);
        try {
            const resp = await fetch(`${API}/agendas/${agendaSlug}`);
            const data = await resp.json();

            if (Array.isArray(data.contacts)) {
                setContacts(data.contacts);
            } else {
                setContacts([]);
            }
        } catch (error) {
            console.error("Error cargando contactos:", error);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Seleccionar agenda y cargar sus contactos
    const selectAgenda = async (slug) => {
        setSelectedAgenda(slug);
        await loadContacts(slug);
    };

    // 🔹 Crear contacto en la agenda seleccionada
    const createContact = async (contact) => {
        if (!selectedAgenda) return;
        await fetch(`${API}/agendas/${selectedAgenda}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
        });
        loadContacts(selectedAgenda);
    };

    // 🔹 Actualizar contacto
    const updateContact = async (id, contact) => {
        if (!selectedAgenda) return;
        await fetch(`${API}/agendas/${selectedAgenda}/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
        });
        loadContacts(selectedAgenda);
    };

    // 🔹 Eliminar contacto
    const deleteContact = async (id) => {
        if (!selectedAgenda) return;
        await fetch(`${API}/agendas/${selectedAgenda}/contacts/${id}`, {
            method: "DELETE",
        });
        loadContacts(selectedAgenda);
    };

    useEffect(() => {
        loadAgendas();
    }, []);

    return (
        <ContactContext.Provider
            value={{
                agendas,
                selectedAgenda,
                contacts,
                loading,
                loadAgendas,
                selectAgenda,
                createAgenda,
                createContact,
                updateContact,
                deleteContact,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};
