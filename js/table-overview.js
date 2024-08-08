let games = [];
let showFavourites = false;

const fetchGames = async () => {
    const response = await fetch("http://localhost:3000/games");
    const result = await response.json();
    games = result;
};

const searchByFetch = async (chars) => {
    const response = await fetch(`http://localhost:3000/games?query=${chars}`);
    return await response.json();
};

const toString = (game) => `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.isFavourite}`;

const statusDiv = document.createElement('div');
statusDiv.id = 'status';
statusDiv.addEventListener("mouseover", () => statusDiv.style.backgroundColor = "green");
statusDiv.addEventListener("mouseout", () => statusDiv.style.backgroundColor = "");
document.querySelector('main').appendChild(statusDiv);

const h2party = document.querySelector('h2');
h2party.addEventListener("click", () => {
    h2party.style.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
});

const fetchAndRenderGames = async () => {
    await fetchGames();

    const ratingField = document.querySelector("#rating-field");
    const searchField = document.querySelector("#search-field");

    const rating = parseFloat(ratingField.value);
    const searchQuery = searchField.value;

    let filteredGames = games;

    if (searchQuery) {
        filteredGames = await searchByFetch(searchQuery);
        document.querySelector('#table-caption').textContent = `Games with name containing '${searchQuery}'`;
    } else if (showFavourites) {
        filteredGames = filteredGames.filter(game => game.isFavourite);
        document.querySelector('#table-caption').textContent = `Favourite Games`;
    } else {
        document.querySelector('#table-caption').textContent = `All games`;
    }

    if (!isNaN(rating)) {
        filteredGames = filteredGames.filter(game => game.rating > rating);
    }


    const tableBody = document.querySelector("#my-games-table-body");
    tableBody.innerHTML = "";

    if (filteredGames.length === 0) {
        hideTable();
        document.querySelector("#status").textContent = searchQuery ? `No games available in the library with characters '${searchQuery}'.` : 'No games available in the library.';
        return;
    }
    displayTable();

    if (document.getElementById("status").textContent.includes("No games available")) {
        clearStatus();
    }

    filteredGames.forEach((game) => {
        const tableRow = document.createElement("tr");
        addTableCell({ tableRow, value: game.name });
        addTableCell({ tableRow, value: game.type });
        addTableCell({ tableRow, value: game.rating });
        tableRow.appendChild(createDeleteButton(game));

        tableRow.addEventListener("click", () => {
            clearStatus();
            addStatus(toString(game));
        });

        tableRow.addEventListener("dblclick", () => {
            toggleFavourite(game);
            clearStatus();
            addStatus(`The game with the name ${game.name} is now (not) my favourite.`);
        });

        tableBody.appendChild(tableRow);
    });
};

document.querySelector("#show-favourites").addEventListener("click", () => {
    showFavourites = true;
    fetchAndRenderGames();
});

document.querySelector("#show-all").addEventListener("click", () => {
    showFavourites = false;
    fetchAndRenderGames();
});

document.querySelector("#rating-field").addEventListener("input", () => {
    fetchAndRenderGames();
});

const toggleFavourite = async (game) => {
    await fetch(`http://localhost:3000/games/${game.id}/Favourite`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    fetchAndRenderGames();
}

const createDeleteButton = (game) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteGame(game));
    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteButton);
    return deleteCell;
};

const deleteGame = async (game) => {
    await fetch(`http://localhost:3000/games/${game.id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    addStatus(`The game with the name ${game.name} is now deleted.`);
    fetchAndRenderGames();
};

const hideTable = () => document.querySelector("table").classList.add("hidden");

const displayTable = () => {
    document.querySelector("table").classList.remove("hidden")

};

fetchAndRenderGames();
setInterval(fetchAndRenderGames, 1000);
