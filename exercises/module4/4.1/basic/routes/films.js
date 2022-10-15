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
        duration: 220,
        budget: 100,
        link: "www.imdb.com"
    },
];

router.get('/', (req,res, next) => {
    console.log('GET /films');
   res.json(LISTES);
});

router.get('/:id', (req,res) => {
    console.log(`GET /films/${req.params.id}`);

    const indexOfMovieFound = LISTES.findIndex((movie) => movie.id == req.params.id);
    if(indexOfMovieFound < 0) return res.sendStatus(404);
    res.json (LISTES[indexOfMovieFound]);
})

// router.readOne('/:id', (req, res) =>{
//     console.log(`READ ONE /films/${req.params.id}`);
//     const foundIndex = LISTES.findIndex(liste => liste.id == req.params.id);
//     console.log(foundIndex);
//     if(foundIndex < 0) return res.sendStatus(404);

//     res.json(LISTES[foundIndex]);
// });

router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');
    console.log(title);
    console.log(duration);
    console.log(budget);
    console.log(link);

    if(!title || !duration || !budget || !link) return res.sendStatus(400); 
    const lastItemIndex = LISTES?.length !== 0 ? LISTES.length -1 : undefined;
    const lastId = lastItemIndex !== undefined ? LISTES[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newMovie = {
        id: nextId,
        duration: duration,
        budget: budget,
        link : link,
    };

    LISTES.push(newMovie);
    res.json(newMovie);
});

module.exports = router;