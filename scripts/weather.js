const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=39.6029&lon=-9.0684&units=metric&appid=bbcae6077af379ec3f8342d9358b5efc';

async function apiFetch(){
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Test the response
            displayResults(data); 
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error); 
    }
}
      
apiFetch();

function displayResults(data) {
    // Exibe a temperatura
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    
    // Exibe o ícone do clima
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    
    // Descrição do clima
    captionDesc.textContent = data.weather[0].description;

    // Umidade
    humidity.textContent = data.main.humidity;

    // Velocidade do vento
    windSpeed.textContent = (data.wind.speed * 3.6).toFixed(1); // Converte de m/s para km/h
}
