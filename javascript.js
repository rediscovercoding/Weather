console.log('ETG');
let display= document.querySelector(".temperatureDisplay");
let conditionsDiv= document.querySelector('.conditions');
let cityName= document.querySelector("input");
let tempDiv= document.createElement('div');
let condition= document.createElement('div');
let conditionImage= document.createElement('img');
let unitSpan= document.createElement('span');

async function fetchWeather() {
    let string = cityName.value;
    const reponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${string}&appid=8b3f9a447606e0f81fe339a48bead862`,
         { mode: "cors" }
    );
    const weatherData = await reponse.json();
    let tempC = parseInt(weatherData.main.temp-273);
    tempDiv.textContent=tempC;
    tempDiv.setAttribute('id', 'tempReading');
    display.appendChild(tempDiv);
    unitSpan.textContent= " \u00B0" +"C";
    unitSpan.setAttribute('id', 'unitSpan');
    let displayUnit= document.querySelector('#tempReading');
    displayUnit.appendChild(unitSpan);
    let conditionString= weatherData.weather[0].description
    condition.textContent= conditionString.toUpperCase();
    condition.setAttribute('class', 'condition');
    conditionsDiv.appendChild(condition);
    conditionImage.src= `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    conditionsDiv.appendChild(conditionImage);
}

fetchWeather();

function switchUnit(){
    let unitSpan= document.querySelector('#unitSpan');
    if (unitSpan.textContent== " \u00B0" +"F"){
        fetchWeather();
        
    }
    else if (unitSpan.textContent== " \u00B0" +"C"){
        unitSpan.textContent= " \u00B0" +"F";
        let tempReading= document.querySelector('#tempReading');
        let celcius= tempReading.innerHTML;
        console.log(parseInt(celcius));
        tempReading.textContent= (((parseInt(celcius))*9/5)+32);
        display.appendChild(tempReading);
        
    }
    let displayUnit= document.querySelector('#tempReading');
    displayUnit.appendChild(unitSpan);
}