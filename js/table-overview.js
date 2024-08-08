let games = [];
let showFavourites = false;

const fetchGames = async () => {
    const response = await fetch("http://localhost:3000/games");
    const result = await response.json();
    games.length = 0;
    games.push(...result);
};

const searchByFetch = async (chars) => {
    const response = await fetch(`http://localhost:3000/games?query=${chars}`);
    const result = await response.json();
    return result;
};

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.isFavourite}`;
};

const statusDiv = document.createElement('div');
statusDiv.id = 'status';

statusDiv.addEventListener("mouseover", () => statusDiv.setAttribute("style", "background-color: green;"));
statusDiv.addEventListener("mouseout", () => statusDiv.removeAttribute("style"));

const h2party = document.querySelector('h2');
h2party.addEventListener("click", () => {
    const randomizer = Math.floor(Math.random() * 360);
    h2party.style.color = `hsl(${randomizer}, 100%, 50%)`;
});

const statusHeader = document.createElement('h3');

const renderGames = (games) => {
    const searchField = document.querySelector("#search-field");
    const searchQuery = searchField.value;
    const tableBody = document.querySelector("#my-games-table-body");
    clearTableRows({ tableBody: 'my-games-table-body' });

    if (games.length === 0) {
        hideTable();
        const statusMessage = searchQuery ? `No games available in the library with characters '${searchQuery}'.` : 'No games available in the library.';
        document.querySelector("#status").textContent = statusMessage;
        return;
    }
    clearStatus()
    displayTable()

    games.forEach((game) => {
        const tableRow = document.createElement("tr");
        addTableCell({ tableRow, value: game.name });
        addTableCell({ tableRow, value: game.type });
        addTableCell({ tableRow, value: game.rating });
        tableRow.appendChild(createDeleteButton(game));

        tableRow.addEventListener("click", () => {
            clearStatus();
            const statusHeader = document.createElement('h3');
            statusHeader.textContent = 'Status';
            document.getElementById("status").appendChild(statusHeader);
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

    renderGames(filteredGames);
};

statusHeader.textContent = 'Status';

statusDiv.appendChild(statusHeader);

document.querySelector('main').appendChild(statusDiv);



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
    clearStatus();
    addStatus(`The game with the name ${game.name} is now deleted.`);
    fetchAndRenderGames();
};

const hideTable = () => {
    const table = document.querySelector("table");
    if (table) {
        table.classList.add("hidden");
    }
};

const displayTable = () => {
    const table = document.querySelector("table");
    if (table) {
        table.classList.remove("hidden");
    }
};
fetchAndRenderGames();
setInterval(fetchAndRenderGames, 1000);
