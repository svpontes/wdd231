// URL da API de previsão de 5 dias/3 horas
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=39.6029&lon=-9.0684&units=metric&appid=d9fd390b08599c25aeeac65b0917294e';

// Função principal para obter e exibir a previsão
async function getForecast() {
  try {
    const response = await fetch(forecastUrl); // Alterado para 'forecastUrl'

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dados da API:", data); // Log para verificar os dados

    // Processa os dados da previsão
    const forecastData = processForecastData(data.list);

    // Função que cria e exibe os elementos
    displayForecast(forecastData);
  } catch (error) {
    console.error("Erro ao obter a previsão:", error);
  }
}

// Função que processa os dados da API e retorna apenas os 4 dias de interesse
function processForecastData(list) {
  const days = {};

  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });

    if (!days[dayKey]) {
      days[dayKey] = {
        date: dayKey,
        tempMax: item.main.temp,
        tempMin: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description
      };
    }

    days[dayKey].tempMax = Math.max(days[dayKey].tempMax, item.main.temp);
    days[dayKey].tempMin = Math.min(days[dayKey].tempMin, item.main.temp);
  });

  console.log("Previsão processada:", Object.values(days).slice(0, 4)); // Log para verificar os dados processados

  return Object.values(days).slice(0, 4); // Limitar a 4 dias
}

// Função para criar e exibir os elementos na tela
function displayForecast(forecastData) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = ''; // Limpa o conteúdo existente

  // Cria os elementos para cada dia da previsão
  forecastData.forEach(day => {
    // Criar o elemento div para cada previsão diária
    const dayForecast = document.createElement('div');
    dayForecast.classList.add('day-forecast');

    // Criar o título com a data
    const dateElement = document.createElement('h3');
    dateElement.textContent = day.date;

    // Criar a imagem com o ícone do clima
    const iconElement = document.createElement('img');
    iconElement.src = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
    iconElement.alt = day.description;

    // Criar o parágrafo com a temperatura máxima e mínima
    const tempElement = document.createElement('p');
    tempElement.textContent = `${day.tempMax.toFixed(1)}°C / ${day.tempMin.toFixed(1)}°C`;

    // Adicionar os elementos criados à div do dia
    dayForecast.appendChild(dateElement);
    dayForecast.appendChild(iconElement);
    dayForecast.appendChild(tempElement);

    // Adicionar a div do dia ao container da previsão
    forecastContainer.appendChild(dayForecast);

  });

  
}

// Chamar a função para exibir a previsão
getForecast();
