let timeoutID;
const delayInSeconds = 2;
const delayInMiliSeconds = delayInSeconds * 1000;

function delayedAlert() {
  timeoutID = setTimeout(() => {
    
  }, delayInMiliSeconds);
}

divs.forEach((div) => {
    
});

function clearAlert() {
  clearTimeout(timeoutID);
}