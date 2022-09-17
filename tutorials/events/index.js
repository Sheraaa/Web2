const divs = document.querySelectorAll(".message");

divs.forEach((div) => {
  div.addEventListener("mouseover", () => {
    div.innerText = "Hello world!";
  });

  div.addEventListener("mouseout", (shera) => {
    div.innerText = `You have left the div wit id ${shera.target.id}`;
  });
});
// code to get the reference to the form shall be imagined

const onSubmit = (shera) => {
    console.log("onSubmit::");
    shera.preventDefault();
  };
  
  myForm.addEventListener("submit", onSubmit);  