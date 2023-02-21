// la constante apiKey a normalement été importée depuis index.html
const endPoint = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=metric&lang=fr";

/* Définition des méthodes */

function generateEndPointUrl(cityName)
{
    return endPoint + "&q=" + cityName;
}

function displayWeatherOnPage(weatherData)
{
    console.log(weatherData);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" />
            ${weatherData.main.temp} &deg;C <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" />
        </h2>

        <small>${weatherData.weather[0].description}</small>
    `;

    main.innerHTML = "";
    main.appendChild(weather);
}

async function getWeatherByLocation(cityName)
{
    // Génération de l'url endPoint
    const urlEndPoint = generateEndPointUrl(cityName);

    console.log(urlEndPoint);

    // Récupération des données sur OpenWeatherMap
    const response = await fetch( urlEndPoint );

    // Traduction en JSON
    const responseData = await response.json();

    // Envoi du résultat à la méthode d'affichage
    displayWeatherOnPage(responseData);
}


/* Fonctionnement principal */

// Récupération de l'élément champ cityName
const cityNameInput = document.getElementById("cityName");

// Récupération de l'élement form
const form = document.getElementById('meteo-form');


// Gestion de l'événement submit sur l'élément form
if (form)
{
    form.addEventListener(
        'submit',
        ( event ) => {
            // On empêche le comportement normal du submit d'un formulaire (raffraichir la page)
            event.preventDefault();

            // Récupération de la valeur de l'élement cityName
            const cityName = cityNameInput.value;

            // Si un nom de ville a été saisi, on peut appeler la méthode
            if (cityName)
            {
                getWeatherByLocation(cityName);
            }
        }
    )
}