const lightSequence = ['red', 'orange', 'green', 'orange'];
const delaysBetweenLightChanges = 2000;
let currentLightIndex = 0;

cycleThroughtLights();

function cycleThroughtLights(){
    const currentLightColor = lightSequence[currentLightIndex];
    const currentLight = document.querySelector (`.${currentLightColor}`);
    currentLight.style.backgroundColor = currentLightColor;
    setTimeout(()=>{
        currentLight.style.backgroundColor = '';
        currentLightIndex = (currentLightIndex + 1) % lightSequence.length;
        cycleThroughtLights();
    }, delaysBetweenLightChanges);
}