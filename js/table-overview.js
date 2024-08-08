const games = [];

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
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.Favourite}`;
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

const renderGames = (games, filterFunction) => {
    const tableBody = document.querySelector("#my-games-table-body");
    clearTableRows({ tableBody: 'my-games-table-body' });

    const filteredGames = filterFunction ? games.filter(filterFunction) : games;

    if (filteredGames.length === 0) {
        hideTable();
        document.querySelector("#status").textContent = 'No games available in the library.';
        return;
    }

    filteredGames.forEach((game) => {
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
    renderGames(games);
};

const searchByFetchAndRender = async (chars) => {
    const filteredGames = await searchByFetch(chars);
    renderGames(filteredGames);
    document.querySelector('#table-caption').textContent = `Games with name containing '${chars}'`;
};
statusHeader.textContent = 'Status';

statusDiv.appendChild(statusHeader);

document.querySelector('main').appendChild(statusDiv);

fetchAndRenderGames();

document.querySelector("#show-favourites").addEventListener("click", () => {
    renderGames(games, game => game.Favourite);
});

document.querySelector("#show-all").addEventListener("click", () => {
    renderGames(games);
});

document.querySelector("#rating-field").addEventListener("input", (event) => {
    const rating = parseFloat(event.target.value);
    if (isNaN(rating)) {
        renderGames(games);
    } else {
        renderGames(games, game => game.rating > rating);
    }
});

document.querySelector("#fetch-games").addEventListener("click", () => {
    const searchQuery = document.querySelector("#search-field").value;
    searchByFetchAndRender(searchQuery);
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
    clearStatus()
    addStatus(`The game with the name ${game.name} is now deleted.`)
    fetchAndRenderGames();
};

const hideTable = () => {
    const table = document.querySelector("table");
    if (table) {
        table.classList.add("hidden");
    }
};