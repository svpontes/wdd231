// --- Weather Section ---
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const city = 'Chamber City';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const currentTemp = data.list[0].main.temp;
        const weatherDescription = data.list[0].weather[0].description;
        document.getElementById('current-temp').innerText = `Current Temperature: ${currentTemp}°C`;
        document.getElementById('weather-description').innerText = `Description: ${weatherDescription}`;

        const forecastContainer = document.getElementById('forecast');
        for (let i = 1; i <= 3; i++) {
            const forecastTemp = data.list[i * 8].main.temp;
            const forecastDate = new Date(data.list[i * 8].dt_txt).toDateString();
            const forecastItem = document.createElement('p');
            forecastItem.innerText = `${forecastDate}: ${forecastTemp}°C`;
            forecastContainer.appendChild(forecastItem);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// --- Spotlight Section ---
const companies = [
  // seu array JSON
];

function displaySpotlightCompanies() {
  const spotlightContainer = document.getElementById('spotlight-companies');

  const spotlightMembers = companies.filter(company => company.membershipLevel >= 2);

  const shuffledMembers = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

  shuffledMembers.forEach(company => {
    const spotlightCard = document.createElement('div');
    spotlightCard.classList.add('spotlight-card');
    spotlightCard.innerHTML = `
      <img src="${company.icon}" alt="${company.name}" width="100" height="100">
      <h3>${company.name}</h3>
      <p>${company.address}</p>
      <p>${company.phone}</p>
      <a href="${company.website}" target="_blank">Visit Website</a>
      <p><strong>Membership Level:</strong> ${company.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
    `;
    spotlightContainer.appendChild(spotlightCard);
  });
}

getWeatherData();
displaySpotlightCompanies();

