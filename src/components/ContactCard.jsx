// src/components/ContactCard.jsx
import React from "react";

const ContactCard = ({ contact, onDelete, onEdit }) => {
    return (
        <div className="card p-3 m-2">
            <h4>{contact.name}</h4>
            <p>📞 {contact.phone}</p>
            <p>📧 {contact.email}</p>
            <p>📍 {contact.address}</p>

            <button className="btn btn-primary me-2" onClick={onEdit}>
                Editar
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
                Eliminar
            </button>
        </div>
    );
};

export default ContactCard;
