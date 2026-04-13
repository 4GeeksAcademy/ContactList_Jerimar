// store.js
const API = "https://playground.4geeks.com/contact/agendas";
const AGENDA = "jerimar_agenda";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },

        actions: {
            // Crear agenda si no existe
            createAgenda: async () => {
                await fetch(`${API}/${AGENDA}`, { method: "POST" });
            },

            // Obtener contactos
            getContacts: async () => {
                const resp = await fetch(`${API}/${AGENDA}/contacts`);
                const data = await resp.json();
                setStore({ contacts: data.contacts || [] });
            },

            // Crear contacto
            addContact: async (contact) => {
                await fetch(`${API}/${AGENDA}/contacts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
                });
                getActions().getContacts();
            },

            // Actualizar contacto
            updateContact: async (id, contact) => {
                await fetch(`${API}/${AGENDA}/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
                });
                getActions().getContacts();
            },

            // Eliminar contacto
            deleteContact: async (id) => {
                await fetch(`${API}/${AGENDA}/contacts/${id}`, {
                    method: "DELETE"
                });
                getActions().getContacts();
            }
        }
    };
};

export default getState;
