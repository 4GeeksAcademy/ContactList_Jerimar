import React from "react";
import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext.jsx";

const ContactCard = ({ contact, image }) => {
    const { deleteContact } = useContacts();

    const handleDelete = () => {
        if (confirm(`¿Eliminar a ${contact.name}?`)) {
            deleteContact(contact.id);
        }
    };

    return (
        <div className="card mb-3 p-3 d-flex flex-row align-items-center gap-3">

            {image && (
                <img
                    src={image}
                    alt="Personaje"
                    className="rounded"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
            )}

            <div className="flex-grow-1">
                <h5 className="mb-1">{contact.name}</h5>
                <p className="mb-0">{contact.email}</p>
                <p className="mb-0">{contact.phone}</p>
                <p className="mb-0">{contact.address}</p>
            </div>

            <div className="d-flex flex-column gap-2">
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
    );
};

export default ContactCard;
