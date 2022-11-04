import joker from '../../img/Joker.jpg';
import wild from '../../img/wild.jpg';

const homePage = `<div class="text-center">
<h3>Welcome to myMovies !</h3>
<p>Here you can find a selection of my favorite movies</p>
<div class="pb-3">
  <img class="img-thumbnail w-50" src="${wild}" alt="wild" />
  <p> This is one of my favorite movie </p>
</div>
<div>
  <img
    class="img-thumbnail w-50"
    src="${joker}"
    alt="Joker"
  />
  <p> I have really enjoyed this movie ! </p>
</div>
</div>`;

const HomePage = () => {
    const main = document.querySelector('main');
    main.innerHTML = homePage;
}
export default HomePage;