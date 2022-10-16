var express = require('express');
var router = express.Router();

const LISTES = [
    {
        id: 1,
        title: 'Into the wild',
        duration: 200,
        budget: 20,
        link: "www.imdb.com"
    },
    {
        id: 2,
        title: 'Joker',
        duration: 120,
        budget: 100,
        link: "www.imdb.com"
    },
];

router.get('/', (req,res, next) => {
    console.log('GET /films');
    const minimumFilmDuration = req?.query ? parseInt(req.query['minimum-duration']) : undefined;

    if(minimumFilmDuration && (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0))
    return res.sendStatus(400);

    if(!minimumFilmDuration) return res.json(LISTES);

    const filmsReachingMinimumDuration = LISTES.filter((film) => film.duration >= minimumFilmDuration);
    return res.json(filmsReachingMinimumDuration);
});

// Read the movie identified by an id in the listes
router.get('/:id', (req,res) => {
    console.log(`GET /films/${req.params.id}`);

    const indexOfMovieFound = LISTES.findIndex((movie) => movie.id == req.params.id);
    if(indexOfMovieFound < 0) return res.sendStatus(404);
    res.json (LISTES[indexOfMovieFound]);
});

router.post('/', function(req, res) {
    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const duration = typeof req?.body?.duration !== 'number' || req.body.duration < 0 ? undefined : req.body.duration ;
    const budget = typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;
    const link = req?.body?.link?.trim()?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');

    if(!title || !duration || !budget || !link) return res.sendStatus(400); 
    const lastItemIndex = LISTES?.length !== 0 ? LISTES.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? LISTES[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newMovie = {
        id: nextId,
        title,
        duration,
        budget,
        link
    };

    LISTES.push(newMovie);
    return res.json(newMovie);
});

//Delete a movie from the listes based on its id
router.delete('/:id', (req,res) =>{
    console.log(`DELETE /films/${req.params.id}`);
    const foundIndex = LISTES.findIndex(liste => liste.id == req.params.id);
    console.log(foundIndex);
    if(foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromListe = LISTES.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromListe[0];

    res.json(itemRemoved);
});

router.patch('/:id', (req,res) =>{
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    console.log('POST /films');

    if((!title && !duration && !budget && link) || title?.length === 0 
    || link?.length === 0 || budget < 0 || duration < 0)
        return res.sendStatus(400);

    const foundIndex = LISTES.findIndex (liste => liste.id == req.params.id);
    if( foundIndex < 0) return res.sendStatus(404);
    const updatedMovie = {...LISTES[foundIndex], ...req.body};
    LISTES[foundIndex] = updatedMovie;
    res.json(updatedMovie);
});



module.exports = router;