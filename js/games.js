const game1 = {name: "Elden Ring", type: "Soulslike", rating: 4.8, Favourite: true}

const game2 = {name: "Horizon Forbidden West", type: "Adventure", rating: 4.2, Favourite: true }

const game3 = {name: "Pokemon legends: Arceus", type: "RPG", rating: 3.8, Favourite: false}

const game4 = {name: "GTA V", type: "Open world", rating: 4.0, Favourite: false}

const game5 = {name: "Gran Turismo", type: "Car", rating: 3.0, Favourite: false}

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.Favourite}`
}

const printAllGames = () => {
    addStatus(toString(game1));
    addStatus(toString(game2));
    addStatus(toString(game3));
    addStatus(toString(game4));
    addStatus(toString(game5));
}

printAllGames()
