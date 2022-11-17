import { deleteOneMovie, readAllMovies, updateOneMovie } from '../../models/movies'

const ViewMoviePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';
  const movieWrapper = document.querySelector('#movieWrapper');
  const movies = await readAllMovies();
  const movieAsHtmlTable = getHtmlMovieTableAsString(movies);
  movieWrapper.innerHTML = movieAsHtmlTable;
  attachEventListeners();
};

function getHtmlMovieTableAsString(movies) {
  if (movies?.length === undefined || movies.length === 0) {
    return '<p class = "p-5"> No movies yet :( </p>';
  }

  let htmlMovieTable = `<div class="table-responsive p-5">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Link</th>
      <th scope="col">Budget (million)</th>   
      <th scope="col">Duration</th> 
      <th scope="col" colspan="2">Operations</th>
    </tr>
  </thead>
  <tbody>`;

  movies.forEach((element) => {
    htmlMovieTable += `
      <tr>
        <td class="fw-bold text-info" contenteditable="true">${element.title}</td>
        <td class="text-info text-break" contenteditable="true"><a class="text-info" href="${element.link}" target="_blank"> ${element.link}</a></td>
        <td class="text-info" contenteditable="true">${element.duration}</td>
        <td class="text-info" contenteditable="true">${element.budget}</td>
        <td><button type="button" class="btn btn-info delete" data-element-id="${element.id}">Delete</button></td>
        <td><button type="button" class="btn btn-info update" data-element-id="${element.id}">Save</button></td>
      </tr>
      `;
  });

  return htmlMovieTable;
}

function attachEventListeners() {
  const movieWrapper = document.querySelector('#movieWrapper');

  movieWrapper.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;
      await deleteOneMovie(elementId);
      ViewMoviePage();
    });
  });

  movieWrapper.querySelectorAll('.update').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;
      const filmRow = e.target.parentElement.parentElement;

      const newFilmData = {
        title: filmRow.children[0].innerHTML,
        link: filmRow.children[1].innerText,
        duration: Number.parseInt(filmRow.children[2].innerHTML, 10),
        budget: Number.parseInt(filmRow.children[3].innerHTML, 10),
      };
      await updateOneMovie(elementId, newFilmData);
      ViewMoviePage();
    });
  });
}
export default ViewMoviePage;