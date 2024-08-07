const game1 = {name: "Fifa23", type: "Football", rating: 7, Favourite: false}

const game2 = {name: "AOTennis 2", type: "Tennis", rating: 2, Favourite: true }

const game3 = {name: "Elden Ring", type: "Soulslike", rating: 4, Favourite: false}

const game4 = {name: "Horizon Forbidden West", type: "Adventure", rating: 3.5, Favourite: false }

const game5 = {name: "Pokemon legends: Arceus", type: "RPG", rating: 3, Favourite: true}

const game6 = {name: "GTA V", type: "Open world", rating: 5, Favourite: true}

const game7 = {name: "Gran Turismo", type: "Car", rating: 6, Favourite: true}

const games = [game1, game2, game3, game4, game5, game6, game7]


const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.Favourite}`
}

const printAllGames = () => {
    for (const game of games) {
    addStatus(toString(game))
    }
}

const getAverageRating = () => {
    let sum = 0
    for (const game of games) {
        sum += game.rating;
    }
    return (sum / games.length).toFixed(1);

}
const avgrating = getAverageRating()


const getHighestRating = () => {
    let highestRated = game1;
    if(highestRated.rating < game2.rating){
        highestRated = game2
    }
    if(highestRated.rating < game3.rating){
        highestRated = game3
    }
    if(highestRated.rating < game4.rating){
        highestRated = game4
    }
    if(highestRated.rating < game5.rating){
        highestRated = game5
    }
    if(highestRated.rating < game7.rating){
        highestRated = game6
    }
    if(highestRated.rating < game7.rating){
        highestRated = game7
    }
    return highestRated
} 
const highestRatedGame = getHighestRating()

const isFavourite = (game) => {
    return game.Favourite
}

printAllGames()

addStatus('<h2>My Favourites ...</h2>');

const printFavouriteGames = () => {
    isFavourite(game1) ? addStatus(`${game1.name}`) : null;
    isFavourite(game2) ? addStatus(`${game2.name}`) : null;
    isFavourite(game3) ? addStatus(`${game3.name}`) : null;
    isFavourite(game4) ? addStatus(`${game4.name}`) : null;
    isFavourite(game5) ? addStatus(`${game5.name}`) : null;
    isFavourite(game4) ? addStatus(`${game6.name}`) : null;
    isFavourite(game5) ? addStatus(`${game7.name}`) : null;
}

printFavouriteGames()

addStatus('<h2>Some statistics ...</h2>');
addStatus(`Average of all games: ${avgrating}`)
addStatus(`${highestRatedGame.name} is the game with the highest rating: ${highestRatedGame.rating}`)
