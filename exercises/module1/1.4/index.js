const divRed = document.querySelector('.red');
const divOrange = document.querySelector('.orange');
const divGreen = document.querySelector('.green');

startApplication()

function startApplication(){
  setInterval(lightup, 2000);
}

function lightup(){
  if(divRed.style.backgroundColor === "" &&
      divOrange.style.backgroundColor === "" &&
      divGreen.style.backgroundColor === ""){
    divRed.style.backgroundColor = "red";
  } else if(divRed.style.backgroundColor === "red"){
    divRed.style.backgroundColor = "";
    divOrange.style.backgroundColor = "orange";
  } else if (divOrange.style.backgroundColor === "orange"){
    divOrange.style.backgroundColor = "";
    divGreen.style.backgroundColor = "green";
  }
}