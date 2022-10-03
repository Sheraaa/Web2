import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const myForm = document.querySelector('form');
const linesInput = document.getElementById('lines');
const columnsInput = document.getElementById('columns');
const startStringInput = document.getElementById('startString');
const tableWrapper = document.querySelector('#tableWrapper');

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const expectedArray = createArray(linesInput.value, columnsInput.value, startStringInput.value)
    const expectedHtmlTableAsString = createHtmlTableAsString(expectedArray);
    tableWrapper.innerHTML = expectedHtmlTableAsString;
});

function createArray(nbLignes = 1, nbColumns = 1, chaine = 'Cell') {
    const tab = [];

    for (let i = 0; i < nbLignes; i += 1) {
        tab.push([]);
        for (let j = 0; j < nbColumns; j += 1) {
            tab[i].push(`${chaine}[${i}][${j}]`);
        }
    }
    return tab;
}

function createHtmlTableAsString(tab) {
    const htmlTableLinesAsString = tab.map((line) => `<tr>${line.map((column) => `<td>${column}</td>`).join('')}</tr>`)
        .join('');

    const htmlTableAsString = `<table class="table table-bordered text-nowrap">
                         ${htmlTableLinesAsString}
                     </table>`;

    return htmlTableAsString;
}