const express = require('express');
const {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
} = require('../models/films');

const router = express.Router();

router.get('/', (req, res) => {

    const filmsPotentiallyFiltered = readAllFilms(req?.query?.['minimum-duration']);

    if (filmsPotentiallyFiltered === undefined) return res.sendStatus(400);

    return res.json(filmsPotentiallyFiltered);
});

// Read the movie identified by an id in the listes
router.get('/:id', (req, res) => {

    const foundFilm = readOneFilm(req?.params.id);
    if (!foundFilm) return res.sendStatus(404);

    return res.json(foundFilm);
});

// Add a movie
router.post('/', (req, res) => {

    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
        typeof req?.body?.duration !== 'number' || req.body.duration < 0
            ? undefined
            : req.body.duration;
    const budget =
        typeof req?.body?.budget !== 'number' || req.body.budget < 0
            ? undefined
            : req.body.budget;

    if (!title || !link || !duration || !budget) return res.sendStatus(400);

    const createdFilm = createOneFilm(title, link, duration, budget);

    return res.json(createdFilm);
});

// Delete a movie from the listes based on its id
router.delete('/:id', (req, res) => {
    const movieDeleted = deleteOneFilm(req?.params?.id);

    if (!movieDeleted) return res.sendStatus(404);

    return res.json(movieDeleted);
});

router.patch('/:id', (req, res) => {
    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    if (
        !req.body ||
        (title && !title.trim()) ||
        (link && !link.trim()) ||
        (duration && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
        (budget && (typeof req?.body?.budget !== 'number' || budget < 0))
    )
        return res.sendStatus(400);

    const updatedMovie = updateOneFilm(req?.params?.id, req?.body);
    if (!updatedMovie) return res.sendStatus(404);

    return res.json(updatedMovie);
});

module.exports = router;