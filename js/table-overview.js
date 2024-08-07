const game1 = {name: "Fifa23", type: "Football", rating: 7, Favourite: false}

const game2 = {name: "AOTennis 2", type: "Tennis", rating: 2, Favourite: true }

const game3 = {name: "Elden Ring", type: "Soulslike", rating: 4, Favourite: false}

const game4 = {name: "Horizon Forbidden West", type: "Adventure", rating: 3.5, Favourite: false }

const game5 = {name: "Pokemon legends: Arceus", type: "RPG", rating: 3, Favourite: true}

const game6 = {name: "GTA V", type: "Open World", rating: 5, Favourite: true}

const game7 = {name: "Gran Turismo", type: "Car", rating: 6, Favourite: true}

const games = [game1, game2, game3, game4, game5, game6, game7]

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.Favourite}`
}

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
    const tableBody = document.querySelector("#my-games-table-body");

    
    games.forEach((game) => {
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
statusHeader.textContent = 'Status';

statusDiv.appendChild(statusHeader);

document.querySelector('main').appendChild(statusDiv);

renderGames(games)