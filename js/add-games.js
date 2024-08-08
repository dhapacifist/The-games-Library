const addGame = () => {
    const name = document.querySelector("#name").value;
    const type = document.querySelector("#type").value;
    const rating = parseInt(document.querySelector("#rating").value);

    const game = {
        name, type, rating 
    };

    const response = fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(game)
    });
    clearStatus()
    addStatus(`Dit spel werd toegevoegd: ${game.name}`);
};

document.querySelector("#add-game-form")
.addEventListener("submit", (event) => {
    event.preventDefault();
    addGame();
});

