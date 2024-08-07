const game1 = {name: "Fifa23", type: "Football", rating: 7, Favourite: false}

const game2 = {name: "AOTennis 2", type: "Tennis", rating: 2, Favourite: true }

const game3 = {name: "Elden Ring", type: "Soulslike", rating: 4, Favourite: false}

const game4 = {name: "Horizon Forbidden West", type: "Adventure", rating: 3.5, Favourite: false }

const game5 = {name: "Pokemon legends: Arceus", type: "RPG", rating: 3, Favourite: true}

const game6 = {name: "GTA V", type: "Open world", rating: 5, Favourite: true}

const game7 = {name: "Gran Turismo", type: "Car", rating: 6, Favourite: true}

const games = [game1, game2, game3, game4, game5, game6, game7]
const [first, second] = games

const friendGame1 =  {name: "Minecraft", type: "Open World", rating: 5, Favourite: true}

const friendGame2 = {name: "Tetris", type: "Puzzle", rating: 5, Favourite: false}

const friendGames = [ friendGame1, friendGame2]

const allGames = [...games, ...friendGames]

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.Favourite}`
}

const printAllGames = (gameArray) => {
    gameArray.forEach((game) => {
    addStatus(toString(game))
    });
}

const getAverageRating = (gameArray) => {
    let sum = 0
    gameArray.forEach((game) => {
        sum += game.rating
    });
    
    return (sum / gameArray.length).toFixed(1);
}
let avgrating = getAverageRating(games)


const getHighestRating = (gameArray) => {
    let highestRated = gameArray[0];
    gameArray.forEach((game) => {
        if (game.rating > highestRated.rating) {
            highestRated = game 
        }
    });

    return highestRated
} 
const highestRatedGame = getHighestRating(games)

const isFavourite = (game) => {
    return game.Favourite
}

const printFavouriteGames = (gamesArray) => {
    gamesArray
    .filter(isFavourite)
    .forEach((game) => addStatus(`${game.name}`));
}

addStatus('<h2>My own games</h2>');
printAllGames(games)
addStatus('<h2>These are all of the favourite games in the library</h2>');
printFavouriteGames(games)
addStatus('<h2>Some statistics ...</h2>');
addStatus(`Average of all games: ${avgrating}`)
addStatus(`${highestRatedGame.name} is the game with the highest rating: ${highestRatedGame.rating}`)
addStatus('<h2>My first 2 games are </h2>');
addStatus(`${first.name}`)
addStatus(`${second.name}`)
addStatus("<h2>My best friend's games </h2>");
printAllGames(friendGames)
addStatus("<h2>All the games in our library:</h2>");
printAllGames(allGames)