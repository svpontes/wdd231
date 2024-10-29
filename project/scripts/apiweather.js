// Seleciona os elementos HTML para exibir os dados do clima
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');




// Seleciona os elementos do footer
const footerCurrentTemp = document.querySelector('#footer-current-temp');
const footerWeatherIcon = document.querySelector('#footer-weather-icon');
const footerHumidity = document.querySelector('#footer-humidity');
const footerWindSpeed = document.querySelector('#footer-wind-speed');
const footerCaptionDesc = document.querySelector('#footer-weather-desc');

// URL da API OpenWeatherMap
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=39.6029&lon=-9.0684&units=metric&appid=d9fd390b08599c25aeeac65b0917294e';

// Função para buscar os dados da API
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json(); // Converte a resposta para JSON
            console.log(data); // Testa os dados no console
            displayResults(data); // Chama a função para exibir os dados na página
        } else {
            throw Error(await response.text()); // Lança erro se a resposta não for bem-sucedida
        }
    } catch (error) {
        console.log(error); // Exibe erros no console
    }
}

// Função para exibir os dados no HTML
function displayResults(data) {
    // Exibe a temperatura na seção "place"
    currentTemp.innerHTML = `${data.main.temp}`;
    
    // Exibe o ícone do clima na seção "place"
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description); // Define a descrição para acessibilidade
    
    // Exibe a descrição do clima na seção "place"
    captionDesc.textContent = data.weather[0].description;
    
    // Exibe a umidade na seção "place"
    humidity.innerHTML = `${data.main.humidity}`;
    
    // Exibe a velocidade do vento na seção "place"
    windSpeed.innerHTML = `${data.wind.speed}`;
    
    // Exibe os dados no footer
    footerWeatherIcon.setAttribute('src', iconSrc);
    footerWeatherIcon.setAttribute('alt', data.weather[0].description);
    footerCurrentTemp.innerHTML = `${data.main.temp}`; // Temperatura
    footerHumidity.innerHTML = `${data.main.humidity}`; // Umidade
    footerWindSpeed.innerHTML = `${data.wind.speed}`; // Velocidade do vento
    footerCaptionDesc.textContent = data.weather[0].description; // Descrição
}

// Invoca a função para buscar os dados da API
apiFetch();
