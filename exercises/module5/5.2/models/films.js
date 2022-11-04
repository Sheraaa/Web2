const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

function readAllFilms(minimumDuration) {
    const films = parse(jsonDbPath);

    if (minimumDuration === undefined) return films;

    const minimumDurationAsNumber = parseInt(minimumDuration, 10);
    if (Number.isNaN(minimumDurationAsNumber) || minimumDurationAsNumber < 0) return undefined;

    const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumDuration);
    return filmsReachingMinimumDuration;
}

function readOneFilm(id) {
    const idAsNumber = parseInt(id, 10);
    const films = parse(jsonDbPath);
    const indexOfMovieFound = films.findIndex((movie) => movie.id === idAsNumber);

    if (indexOfMovieFound < 0) return undefined;

    return films[indexOfMovieFound];
}

function createOneFilm(title, link, duration, budget) {
    const films = parse(jsonDbPath);

    const createdMovie = {
        id: getNextId(),
        title,
        link,
        duration,
        budget,
    };

    films.push(createdMovie);

    serialize(jsonDbPath, films);

    return createdMovie;
}

function getNextId() {
    const films = parse(jsonDbPath);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;

    if (lastItemIndex === undefined) return 1;

    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;

    return nextId;
}

function deleteOneFilm(id) {
    const idAsNumber = parseInt(id, 10);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((movie) => movie.id === idAsNumber);
   
    if (foundIndex < 0) return undefined;
   
    const deletedFilms = films.splice(foundIndex, 1);
    const deletedFilm = deletedFilms[0];

    serialize(jsonDbPath, films);

    return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
    const idAsNumber = parseInt(id, 10);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex(liste => liste.id === idAsNumber);

    if (foundIndex < 0) return undefined;

    const updatedMovies = { ...films[foundIndex], ...propertiesToUpdate };

    films[foundIndex] = updatedMovies;

    serialize(jsonDbPath, films);
    return updatedMovies;
}

module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
};