
const loadCharacterImage = async () => {
    try {
        const resp = await fetch("https://rickandmortyapi.com/api/character/");
        const data = await resp.json();

        const random = data.results[Math.floor(Math.random() * data.results.length)];

        setCharacterImage(random.image);
    } catch (error) {
        console.error("Error cargando imagen de Rick and Morty:", error);
    }
};
