import React from "react";
import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext.jsx";

const ContactCard = ({ contact }) => {
    const { deleteContact } = useContacts();

    return (
        <div className="card mb-3 p-3 d-flex flex-row justify-content-between">
            <div>
                <h5>{contact.name}</h5>
                <p className="mb-0">{contact.email}</p>
                <p className="mb-0">{contact.phone}</p>
                <p className="mb-0">{contact.address}</p>
            </div>

            <div className="d-flex flex-column gap-2">
                <Link to={`/details/${contact.id}`} className="btn btn-outline-primary btn-sm">
                    Editar
                </Link>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteContact(contact.id)}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
