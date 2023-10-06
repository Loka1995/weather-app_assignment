import { SmallWeatherCard } from './components/SmallWeatherCard.js';
import { LargeWeatherCard } from './components/LargeWeatherCard.js';
import {
    createCityObjects,
    fetchCityCodes,
    cacheData,
    retrieveDataFromCache
} from './helpers/dataHelper.js';



window.addEventListener("load", () => {
    main();
});

const main = async function () {
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
        window.alert('Weather data cannot be retrieved!');
        console.error(error);
        console.log('Data cannot be loaded...');
    }
}
