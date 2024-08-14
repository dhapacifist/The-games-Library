const addGame = async () => {
    clearStatus();
  
    const name = document.querySelector("#name").value.trim();
    const type = document.querySelector("#type").value.trim();
    const rating = parseFloat(document.querySelector("#rating").value);
  
    if (!name || !type || isNaN(rating)) {
      addStatusError("One or more fields are empty.");
      return;
    }
    if (name.length < 2 || name.length > 64) {
      addStatusError("The length of the name is invalid.");
      return;
    }
    if (rating <= 0 || rating >= 11) {
      addStatusError("The rating is not valid. it has to be a score between 1-10.");
      return;
    }
    const existingGame = await nameIsUnique(name);
    if (existingGame !== null) {
      addStatusError(`The name is not unique. Game ID: ${existingGame.id}`);
      return;
    }
  
    const game = { name, type, rating };
  
    const response = await fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(game)
    });
      addStatus(`Dit spel werd toegevoegd: ${game.name}`);
    };

const nameIsUnique = async (name) => {
    const response = await fetch(`http://localhost:3000/games/name/${name}`);
    const data = await response.json();
    return data;
    };

document.querySelector("#add-game-form")
.addEventListener("submit", (event) => {
    event.preventDefault();
    addGame();
});

const addStatusError = (status) => {
    document.querySelector("#status").innerHTML = `<p style="color: red;">${status}</p>`;
  };
