const games = [];

const fetchGames = async () => {
    const response = await fetch("http://localhost:3000/games");
    const result = await response.json();
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

    filteredGames.forEach((game) => {
        const tableRow = document.createElement("tr");
        addTableCell({ tableRow, value: game.name });
        addTableCell({ tableRow, value: game.type });
        addTableCell({ tableRow, value: game.rating });

        tableRow.addEventListener("click", () => {
            clearStatus();
            const statusHeader = document.createElement('h3');
            statusHeader.textContent = 'Status';
            document.getElementById("status").appendChild(statusHeader);
            addStatus(toString(game));
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
