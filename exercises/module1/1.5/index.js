let clicks = 0; 
let a = document.getElementById('btn');

a.onclick = function(){
    clicks++;
    console.log(clicks);
    
    if(clicks >= 5 && clicks <= 9 ){
        a.innerHTML = "Bravo, bel échauffement !";
    }
    if(clicks == 10){
        a.innerHTML = "Vous êtes passé maître en l'art du clic !";
    }
}