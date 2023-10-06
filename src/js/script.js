import { SmallWeatherCard } from './components/SmallWeatherCard.js';
import { LargeWeatherCard } from './components/LargeWeatherCard.js';
import { generateOpenWeatherMapURL, generateOpenWeatherMapIconURL } from '../constants/constants.js';

window.addEventListener("load", () => {
    main();
});

const main = async function() {
    try {
        const cityCodes = await fetchCityCodes();
        await cacheData(cityCodes);
        const cachedCityWeatherData = await retrieveDataFromCache("cityData");
        const cityObjects = createCityObjects(cachedCityWeatherData);

        cityObjects.forEach(cityObject => {
            let smallCard = new SmallWeatherCard(cityObject);
            let largeCard = new LargeWeatherCard(cityObject);
            smallCard.addEventListener('show-large-card', () => {
                smallCard.hideSmallCardList();
                largeCard.showLargeCard();
            });
            largeCard.addEventListener('show-small-cards', () => {
                largeCard.backBtnHandler();
                smallCard.showSmallCardList();
            })
            document.querySelector('.weather-container__items').appendChild(smallCard);
        })
    } catch (error) {
        const div = document.createElement('div');
        div.textContent = `${error}`;
        document.appendChild(div);
        console.error(error);
        console.log('Data cannot be loaded...');
    }
}

// function that returns objects with the formatted data intended to be displayed in our webpage
const createCityObjects = function (cachedData) {
    try {
        const cityObjects = [];
        const cityWeatherDataList = cachedData;

        for(let i = 0; i < cityWeatherDataList.length; i++) {
            let cityName = cityWeatherDataList[i].name;
            let country = cityWeatherDataList[i].sys.country;
            let temperature = Math.round(cityWeatherDataList[i].main.temp);
            let minTemp = Math.round(cityWeatherDataList[i].main.temp_min);
            let maxTemp = Math.round(cityWeatherDataList[i].main.temp_max);
            let pressure = cityWeatherDataList[i].main.pressure;
            let humidity = cityWeatherDataList[i].main.humidity;
            let visibility = (cityWeatherDataList[i].visibility / 1000).toFixed(2);
            let windSpeed = cityWeatherDataList[i].wind.speed.toFixed(1);
            let windDirection = cityWeatherDataList[i].wind.deg;
            let timeZoneOffset = cityWeatherDataList[i].sys.timezone
            let time = timeAndDateFormatter(cityWeatherDataList[i].dt, timeZoneOffset).time;
            let date = timeAndDateFormatter(cityWeatherDataList[i].dt, timeZoneOffset).date;
            let sunrise = timeAndDateFormatter(cityWeatherDataList[i].sys.sunrise, timeZoneOffset).time;
            let sunset = timeAndDateFormatter(cityWeatherDataList[i].sys.sunset, timeZoneOffset).time;
            let description = capFirstLetter(cityWeatherDataList[i].weather[cityWeatherDataList[i].weather.length - 1].description);
            let descriptionIconCode = cityWeatherDataList[i].weather[cityWeatherDataList[i].weather.length - 1].icon;
            let iconURL = generateOpenWeatherMapIconURL(descriptionIconCode);

            const tempObject = {
                cityName: cityName,
                country: country,
                temperature: temperature,
                minTemp:minTemp,
                maxTemp: maxTemp,
                pressure: pressure,
                humidity: humidity,
                visibility: visibility,
                windSpeed: windSpeed,
                windDirection: windDirection,
                time: time,
                date: date,
                sunrise: sunrise,
                sunset: sunset,
                description: description,
                iconURL: iconURL
            };

            cityObjects.push(tempObject);
        }
        return cityObjects;
    } catch (error) {
        console.error(error);
        console.log(error);
    }
}

// function to fetch city codes from the json file
const fetchCityCodes = async function () {
    const jsonFilePath = '/data/cities.json';
    const cityCodes = [];
    console.log("Trying to fetch city codes...")
    try {
        const dataFromFile = await fetch(jsonFilePath);
        const fileDataInJSON = await dataFromFile.json();
        const cityData = fileDataInJSON.List;
        cityData.forEach(city => cityCodes.push(city.CityCode));
        console.log("Fetching city codes successful...");
        return cityCodes;
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}

// function to cache data, data will be cached if data are older than 5 minutes
const cacheData = async function (cityCodes) {
	const newTime = Date.now();
	let dataExpired = localStorage.getItem("oldTime") != null ? newTime >= Number(localStorage.getItem("oldTime")) + (1000 * 5) : false;
	let localStorageIsEmpty = (localStorage.getItem("oldTime") === null) && (localStorage.getItem("cityData") === null);
	if (localStorageIsEmpty || dataExpired) {

		// clear the local storage data
		if (!localStorageIsEmpty) {
			localStorage.removeItem("oldTime");
			localStorage.removeItem("cityData");
		}
	
		// set the oldTime equal to the newTime 
		localStorage.setItem("oldTime", newTime);
        try {
            const fetchedDataFromAPI = await fetchDataFromAPI(cityCodes);

            if(fetchedDataFromAPI) {
                localStorage.setItem("cityData", JSON.stringify(fetchedDataFromAPI));
                console.log("caching data successful...")
            } else {
                localStorage.removeItem('oldTime');
                localStorage.removeItem('cityData');
                throw new Error('Data caching unsuccessful');
            }
            
        } catch (error) {
            console.error(error);
            console.log(error);
        }	
	}
}

// function to retrieve data stored in the cache
// should return data in JSON format
const retrieveDataFromCache = function (dataKey) {
    const cachedData =  localStorage.getItem(dataKey);
    return JSON.parse(cachedData);
}

// function to fetch data from the api
const fetchDataFromAPI = async function (cityCodes) {
    const URL = generateOpenWeatherMapURL(cityCodes);

    try {
        const dataFromAPI = await fetch(URL);
        const dataFromAPIToJson = await dataFromAPI.json();

        if(dataFromAPI.status == 401 || dataFromAPI.status == 404 || dataFromAPI.status == 429 || dataFromAPI.status == 500 
            || dataFromAPI.status == 502 || dataFromAPI.status == 503 || dataFromAPI.status == 504 ) {
            throw new Error(`${dataFromAPI.status}: ${dataFromAPI.statusText}`);
        } else return dataFromAPIToJson.list;

    } catch (error) {
        console.error(error);
        console.log(error);
    }
}

// function to format our date and time and return and object.
const timeAndDateFormatter = function (millisecs, offset) {
    const milliseconds = (millisecs * 1000) + (offset * 1000);
    const date = new Date(milliseconds);
    const dateTimeItems = date.toUTCString().split(" ");
    const displayedDate = dateTimeItems[2] + " " + dateTimeItems[1];
    const timeItems = dateTimeItems[4].split(":");
    const rowHours = timeItems[0];
    const displayHours = rowHours % 12 === 0 ? 12 : rowHours % 12;
    const displayMinutes = timeItems[1];
    const amORpm = rowHours > 12 ? 'pm' : 'am';
    const displayedTime = `${displayHours}:${displayMinutes}${amORpm}`;
    return { date: displayedDate, time: displayedTime };
}

// function to capitalize the first letter of a string and then returns the string.
const capFirstLetter = function (string) {
    const stringToCap = string.trim();
    const stringToArr = stringToCap.split(" ");
    const newArray = stringToArr.map(word => word.charAt(0).toUpperCase().concat(word.substring(1, word.length)));
    return newArray.join(" ");
}
