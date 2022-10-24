const express = require('express');
const path = require('node:path');
const { parse, serialize} = require ('../utils/json');

const router = express.Router();
const jsonDbPath = path.join (__dirname, '/../data/films.json');

router.get('/', (req,res) => {
    console.log('GET /films');
    const minimumFilmDuration = req?.query ? parseInt(req.query['minimum-duration'], 10) : undefined;

    if(minimumFilmDuration && (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0))
    return res.sendStatus(400);

    const films = parse(jsonDbPath);
    if(!minimumFilmDuration) return res.json(films);

    const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumFilmDuration);
    return res.json(filmsReachingMinimumDuration);
});

// Read the movie identified by an id in the listes
router.get('/:id', (req,res) => {
    console.log(`GET /films/${req.params.id}`);
    const id = parseInt(req.params.id, 10);
    const films = parse(jsonDbPath);
    const indexOfMovieFound = films.findIndex((movie) => movie.id === id);
    if(indexOfMovieFound < 0) return res.sendStatus(404);
    return res.json (films[indexOfMovieFound]);
});

router.post('/', (req, res) => {
    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const duration = typeof req?.body?.duration !== 'number' || req.body.duration < 0 ? undefined : req.body.duration ;
    const budget = typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;
    const link = req?.body?.link?.trim()?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');

    if(!title || !duration || !budget || !link) return res.sendStatus(400); 
    const films = parse(jsonDbPath);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {id: nextId, title, link, duration, budget};
    
    films.push(newFilm);
    serialize (jsonDbPath, films);
    return res.json(newFilm);
});

// Delete a movie from the listes based on its id
router.delete('/:id', (req,res) =>{
    console.log(`DELETE /films/${req.params.id}`);
    const id = parseInt(req.params.id, 10);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex(liste => liste.id === id);
    console.log(foundIndex);
    if(foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromListe = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromListe[0];

    serialize (jsonDbPath, films);
    return res.json(itemRemoved);
});

router.patch('/:id', (req,res) =>{
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;
    const id = parseInt(req.params.id, 10);

    console.log('POST /films');

    if((title && !title.trim()) && (link && link.trim())
    (!duration && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (!budget && (typeof req?.body?.budget !== 'number' || budget < 0)))
        return res.sendStatus(400);

    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex (liste => liste.id === id);

    if( foundIndex < 0) return res.sendStatus(404);

    const filmPriorToChange = films [foundIndex];
    const objectContainingPropertiesToBeUpdated = req.body;

    const updatedMovie = {...filmPriorToChange, ...objectContainingPropertiesToBeUpdated,};
    films[foundIndex] = updatedMovie;
    serialize(jsonDbPath, films);
    return res.json(updatedMovie);
});

module.exports = router;