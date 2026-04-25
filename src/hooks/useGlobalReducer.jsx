import { createContext, useContext, useEffect, useState } from "react";

const API = "https://playground.4geeks.com/contact";
const AGENDA = "jerimar_agenda";

const ContactContext = createContext();
export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Crear agenda si no existe
  const ensureAgenda = async () => {
    try {
      const resp = await fetch(`${API}/agendas/${AGENDA}`, { method: "POST" });

      // 400 = ya existe → NO es error
      if (resp.status === 400) return;
    } catch (err) {
      console.error("Error creando agenda:", err);
    }
  };

  // Leer contactos
  const loadContacts = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API}/agendas/${AGENDA}/contacts`);

      if (!resp.ok) {
        setContacts([]);
        return;
      }

      const data = await resp.json();

      // Validar que sea un array
      if (Array.isArray(data)) {
        setContacts(data);
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

  // Crear contacto
  const createContact = async (contact) => {
    await fetch(`${API}/agendas/${AGENDA}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    loadContacts();
  };

  // Editar contacto
  const updateContact = async (id, contact) => {
    await fetch(`${API}/agendas/${AGENDA}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    loadContacts();
  };

  // Eliminar contacto
  const deleteContact = async (id) => {
    await fetch(`${API}/agendas/${AGENDA}/contacts/${id}`, {
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
      value={{
        contacts,
        loading,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
