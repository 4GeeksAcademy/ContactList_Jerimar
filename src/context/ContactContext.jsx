import React, { createContext, useContext, useEffect, useState } from "react";

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const ensureAgenda = async () => {
        await fetch("https://playground.4geeks.com/contact/agendas/Jerimar_agenda").catch(
            () => { }
        );
    };

    const loadContacts = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`https://playground.4geeks.com/contact/agendas/Jerimar_agenda`);
            const data = await resp.json();

            if (Array.isArray(data.contacts)) {
                setContacts(data.contacts);
            } else {
                setContacts([]);
            }

        } catch (err) {
            console.error("Error cargando contactos:", err);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };


    const createContact = async (contact) => {
        await fetch("https://playground.4geeks.com/contact/agendas/Jerimar_agenda/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
        });
        loadContacts();
    };

    const updateContact = async (id, contact) => {
        await fetch(`https://playground.4geeks.com/contact/agendas/Jerimar_agenda/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
        });
        loadContacts();
    };

    const deleteContact = async (id) => {
        await fetch(`https://playground.4geeks.com/contact/agendas/Jerimar_agenda/contacts/${id}`, {
            method: "DELETE",
        });
        loadContacts();
    };

    useEffect(() => {
        const init = async () => {
            await ensureAgenda();
            await loadContacts();
        };
        init();
    }, []);

    return (
        <ContactContext.Provider
            value={{ contacts, loading, createContact, updateContact, deleteContact }}
        >
            {children}
        </ContactContext.Provider>
    );
};
