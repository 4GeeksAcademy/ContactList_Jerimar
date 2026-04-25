import React from "react";
import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext.jsx";

const ContactCard = ({ contact }) => {
    const { deleteContact } = useContacts();

    const handleDelete = () => {
        if (confirm(`¿Eliminar a ${contact.name}?`)) {
            deleteContact(contact.id);
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title mb-1">{contact.name}</h5>
                    <p className="mb-0">{contact.email}</p>
                    <p className="mb-0">{contact.phone}</p>
                    {contact.address && <p className="mb-0">{contact.address}</p>}
                </div>
                <div className="d-flex gap-2">
                    <Link
                        to={`/details/${contact.id}`}
                        className="btn btn-sm btn-outline-primary"
                    >
                        Editar
                    </Link>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleDelete}
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
