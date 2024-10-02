//html elements selected that will be manipulated

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
//URL da API do  OpenWeatherMap                             ?indicador de consulta                      api key recebida ao registar
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.7499&lon=6.6371&units=metric&appid=bbcae6077af379ec3f8342d9358b5efc';

//api fetch
//function assync and try-catch block. Payload with JSON formato 

async function apiFetch(){

    try{

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json(); //payload json format
            console.log(data); //test 
            displayResults(data); //show data in the screen

        }  else {
            throw Error(await response.text()); // Lança um erro se a resposta não for bem-sucedida
          }
        } catch (error) {
          console.log(error); // Exibe qualquer erro no console
        }
      }
      
      // Invoca a função para realizar a busca dos dados
      apiFetch();

    function displayResults(data) {
        // Exibe a temperatura no elemento `currentTemp`
        currentTemp.innerHTML = `${data.main.temp}&deg;C`; // ou &deg;F para imperial
      
        // Gera o link para o ícone do clima e define como src do elemento `weatherIcon`
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;
      
        // Define os atributos do ícone de clima
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc); // Define o texto alternativo para acessibilidade
      
        // Define a descrição no elemento `figcaption`
        captionDesc.textContent = desc;
    }
      