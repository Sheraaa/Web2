import {addOneMovie} from '../../models/movies';
import Navigate from '../Router/Navigate'


const addMoviePage = `
<div class ="text-center">
<form class="px-5">
<div class="mb-3">
    <label for ="Title">Enter title</label>
    <input name ="name_movie" id="title" placeholder = "Titanic" required></input>
    </div>
    <br>
    <div class="mb-3">
    <label for ="duration">Enter duration (minutes) </label>
    <input number ="duration_movie" id="duration" placeholder = "240" required></input>
    </div>
    <br>
    <div class="mb-3">
    <label for ="budget">Enter budget (million)  </label>
    <input number ="budget_movie" id="budget" placeholder = "200" required></input>
    </div>
    <br>
    <div class="mb-3">
    <label for ="Enter link">Link</label>
    <input link ="link_movie" id="link" placeholder = "www.imdb..." required></input>
    </div>
    <br>
    <br>
    <input type ="submit" value = "Add Movie !"/>
</form>
</div>`;


const AddMoviePage=()=> {
    const main = document.querySelector('main');
    main.innerHTML = addMoviePage;

    const myForm = document.querySelector('form');
    const title = document.querySelector('#title');
    const duration = document.querySelector('#duration');
    const budget = document.querySelector('#budget');
    const link = document.querySelector('#link');

    myForm.addEventListener('submit',(e)=> {
        e.preventDefault();
        const movieToBeCreated = {
            title : title.value,
            duration: duration.value,
            budget: budget.value,
            link : link.value,
        };

        addOneMovie(movieToBeCreated);
        Navigate('/view-movies');
    });
};

export default AddMoviePage;