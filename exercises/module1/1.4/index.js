let timeoutID;
const delayInSeconds = 2;
const delayInMiliSeconds = delayInSeconds * 1000;

const divRed = document.querySelector('.red');
const divOrange = document.querySelector('.orange');
const divGreen = document.querySelector('.green');

while(true){
  divGreen.style.backgroundColor = "white";
  divRed.style.backgroundColor = "red";
  startClock();
  divRed.style.backgroundColor = "white";
  divOrange.style.backgroundColor = "orange";
  startClock();
  divOrange.style.backgroundColor = "white";
  divGreen.style.backgroundColor = "green";
}
function delayedAlert() {
  timeoutID = setTimeout(() => {
    
  }, delayInMiliSeconds);
}
let myIntervalId;

function startClock() {
  myIntervalId = setInterval(printCurrentTime, 1000);
}

function stopOrResumeClock() {
  if (myIntervalId) {
    clearInterval(myIntervalId);
    myIntervalId = undefined;
  } else startClock();

}

function clearAlert() {
  clearTimeout(timeoutID);
}