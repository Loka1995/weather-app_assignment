
export const generateOpenWeatherMapURL = (cityCodes) => {
    return `http://api.openweathermap.org/data/2.5/group?id=${cityCodes.join()}&units=metric&appid=72d608564b7620acf0b6c74125e6f59c`;
};

export const generateOpenWeatherMapIconURL = (descriptionIconCode) => {
    return `https://openweathermap.org/img/wn/${descriptionIconCode}@2x.png`;
};