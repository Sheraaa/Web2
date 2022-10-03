import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import joker from './img/Joker.jpg';
import wild from './img/wild.jpg';

const titre = document.querySelector('h1');
titre.innerHTML += "My favorite movies are...";

const main = document.querySelector('main');
renderWildimage(wild);
main.innerHTML += "<br> I've really liked this movie ! <br><br>";
renderJokerimage(joker);
main.innerHTML += "<br>I've really liked this movie too !<br><br>";

function renderJokerimage(ima) {
    const image = new Image();
    image.src = ima;
    main.appendChild(image);
}

function renderWildimage(ima) {
    const image = new Image();
    image.src = ima;
    image.height = "500";
    main.appendChild(image);
}