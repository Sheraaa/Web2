const divRed = document.querySelector('.red');
const divOrange = document.querySelector('.orange');
const divGreen = document.querySelector('.green');

startApplication()

function startApplication() {
  setInterval(lightup, 2000);  // setInterval c'est une boucle sans fin, il existe une méthode clear setInterval pour vider
}

function lightup() {
  if (divRed.style.backgroundColor === "" &&
    divOrange.style.backgroundColor === "" &&
    divGreen.style.backgroundColor === "") {
    divRed.style.backgroundColor = "red";
  } else if (divRed.style.backgroundColor === "red") {
    divRed.style.backgroundColor = "";
    divOrange.style.backgroundColor = "orange";
  } else if (divOrange.style.backgroundColor === "orange") {
    divOrange.style.backgroundColor = "";
    divGreen.style.backgroundColor = "green";
  } else if (divGreen.style.backgroundColor === "green") {
    divOrange.style.backgroundColor = "orange";
    divGreen.style.backgroundColor = "";
  } 
}