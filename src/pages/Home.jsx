import React, { useState, useEffect } from "react";
import { useContacts } from "../context/ContactContext.jsx";
import ContactCard from "../components/ContactCard.jsx";

const Home = () => {
    const { contacts, loading } = useContacts();

    // Aquí guardamos las imágenes por ID de contacto
    const [images, setImages] = useState({});

    // Cargar imágenes de Rick and Morty
    const loadImages = async () => {
        try {
            const resp = await fetch("https://rickandmortyapi.com/api/character/");
            const data = await resp.json();

            if (!data.results) return;

            const imgMap = {};

            // Asignar una imagen aleatoria a cada contacto
            contacts.forEach((c) => {
                const random = data.results[Math.floor(Math.random() * data.results.length)];
                imgMap[c.id] = random.image;
            });

            setImages(imgMap);
        } catch (error) {
            console.error("Error cargando imágenes:", error);
        }
    };

    // Cuando los contactos cambien, cargamos imágenes
    useEffect(() => {
        if (contacts.length > 0) {
            loadImages();
        }
    }, [contacts]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Contactos</h1>

            {loading && <p>Cargando contactos...</p>}

            {!loading && contacts.length === 0 && (
                <p>No hay contactos todavía.</p>
            )}

            {!loading &&
                contacts.map((c) => (
                    <ContactCard
                        key={c.id}
                        contact={c}
                        image={images[c.id]} // ← enviamos la imagen
                    />
                ))}
        </div>
    );
};

export default Home;
