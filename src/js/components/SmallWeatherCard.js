const colors = ['#388EE7', '#6249CC', '#40B681', '#DE944E', '#9C3A3A'];
const template = document.createElement('template');
template.innerHTML =
    `
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: sans-serif;
    line-height: 1.5;
  }
  
  span {
    display: block;
    text-wrap: nowrap;
  }
  .weather-item {
    list-style: none;
    position: relative;
    cursor: pointer;
    transition: transform 0.12s ease-in-out;
    margin: auto;
    max-width: 24rem;
    padding-bottom: 1rem;
  }
  
  .weather-item:hover {
    transform: scale(0.98);
  }
  
  .weather-item__close {
    position: absolute;
    right: 0;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0.2rem;
    border-style: none;
    padding: 0;
    font-size: 1.6rem;
    line-height: 1;
    color: white;
    background-color: inherit;
    transition: transform 0.12s ease-in-out;
    cursor: pointer;
  }
  
  .weather-item__close:hover {
    transform: scale(1.25);
  }
  
  .weather-item__top {
    background-color: #388ee7;
    background-image: url("/images/weather-card-background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
  
  .weather-item__city-date {
    text-align: center;
  }
  
  .weather-item-top__left,
  .weather-item-top__right {
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  
  .weather-item__description {
    display: flex;
    justify-content: center;
    align-items: center;
    text-wrap: wrap;
  }
  
  .weather-item__description img {
    height: 2rem;
  }
  
  .weather-item__description span {
    text-wrap: wrap;
  }
  
  .weather-item__temperature {
    font-size: 3rem;
    line-height: 1;
  }
  
  .weather-item__tempMax,
  .weather-item__tempMin,
  .weather-item__date {
    font-size: 0.8rem;
  }
  
  .weather-item__bottom {
    background-color: #383b47;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
  }
  
  .weather-item-bottom__left {
    text-align: left;
  }
  
  .weather-item-bottom__middle {
    text-align: center;
    border-left: 2px solid #515566;
    border-right: 2px solid #515566;
    margin: 1rem;
    padding: 0 1rem;
  }
  
  .weather-item-bottom__right {
    text-align: right;
  }
  @media (min-width: 401px) and (max-width: 768px) {
    .weather-item__top {
      column-gap: 5rem;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .weather-item {
      margin: 0;
      width: 22rem;
      padding-bottom: 0;
    }
  }
  
  @media (min-width: 1025px) and (max-width: 1199px) {
    .weather-item {
      margin: 0;
      width: 30rem;
      padding-bottom: 0;
    }
  
    .weather-item__top {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding: 2rem;
      height: 10rem;
    }
  
    .weather-item__bottom {
      background-color: #383b47;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      height: 6rem;
      font-size: 0.7rem;
    }
  }
  
  @media (min-width: 1199px) {
    .weather-item {
      margin: 0;
      width: 30rem;
      padding-bottom: 0;
    }
  
    .weather-item__top {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding: 2rem;
      height: 10rem;
    }
  
    .weather-item__bottom {
      background-color: #383b47;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      height: 6rem;
      font-size: 0.7rem;
    }
  }

</style>
<li class="weather-item">
    <button class="weather-item__close" type="button">&times;</button>
    <section class="weather-item__top">
    <div class="weather-item-top__left">
        <div class="weather-item__city-date">
            <h3 class="weather-item__city"></h3>
            <span class="weather-item__date"></span>
        </div>
        <div class="weather-item__description">
            <img alt="image" class="weather-description__image"/>
            <span class="weather-description"></span>
        </div>
    </div>
    <div class="weather-item-top__right">
        <span class="weather-item__temperature"></span>
        <div class="weather-item__minmaxtemp">
            <span class="weather-item__tempMin"></span>
            <span class="weather-item__tempMax"></span>
        </div>
    </div>
    </section>
    <section class="weather-item__bottom">
        <div class="weather-item-bottom__left">
            <span class="weather-item__pressure"></span>
            <span class="weather-item__humidity"></span>
            <span class="weather-item__visibility"></span>
        </div>
        <div class="weather-item-bottom__middle">
            <img src="/images/direction.png" alt="image" />
            <span class="weather-item__wind-details"></span>
        </div>
        <div class="weather-item-bottom__right">
            <span class="weather-item__sunrise"></span>
            <span class="weather-item__sunset"></span>
        </div>
    </section>
</li>
`;

export class SmallWeatherCard extends HTMLElement {
    static cardNumber = 0;
    constructor(weatherObj) {
        super();

        SmallWeatherCard.cardNumber++;
        this.colorId = SmallWeatherCard.cardNumber;

        this._cityName = weatherObj.cityName;
        this._country = weatherObj.country;
        this._temperature = weatherObj.temperature;
        this._minTemp = weatherObj.minTemp;
        this._maxTemp = weatherObj.maxTemp;
        this._pressure = weatherObj.pressure;
        this._humidity = weatherObj.humidity;
        this._visibility = weatherObj.visibility;
        this._windSpeed = weatherObj.windSpeed;
        this._windDirection = weatherObj.windDirection;
        this._time = weatherObj.time;
        this._date = weatherObj.date;
        this._sunrise = weatherObj.sunrise;
        this._sunset = weatherObj.sunset;
        this._description = weatherObj.description;
        this._iconURL = weatherObj.iconURL;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('.weather-item__top').style.backgroundColor = colors[this.colorId % 5];
        this.shadowRoot.querySelector('.weather-item').setAttribute('id', this.colorId);

        this.shadowRoot.querySelector('.weather-item__city').textContent = `${this._cityName}, ${this._country}`;
        this.shadowRoot.querySelector('.weather-item__date').textContent = `${this._time}, ${this._date}`;
        this.shadowRoot.querySelector('.weather-item__temperature').innerHTML = `${this._temperature}&deg;c`;
        this.shadowRoot.querySelector('.weather-description__image').src = `${this._iconURL}`;
        this.shadowRoot.querySelector('.weather-description').textContent = `${this._description}`;
        this.shadowRoot.querySelector('.weather-item__tempMin').innerHTML = `<b>Temp Min:</b> ${this._minTemp}&deg;c`;
        this.shadowRoot.querySelector('.weather-item__tempMax').innerHTML = `<b>Temp Max:</b> ${this._maxTemp}&deg;c`;
        this.shadowRoot.querySelector('.weather-item__pressure').innerHTML = `<b>Pressure: </b>${this._pressure}hPa`;
        this.shadowRoot.querySelector('.weather-item__humidity').innerHTML = `<b>Humidity: </b>${this._humidity}%`;
        this.shadowRoot.querySelector('.weather-item__visibility').innerHTML = `<b>Visibility: </b>${this._visibility}km`;
        this.shadowRoot.querySelector('.weather-item__wind-details').textContent = `${this._windSpeed}m/s ${this._windDirection} degrees`;
        this.shadowRoot.querySelector('.weather-item__sunrise').innerHTML = `<b>Sunrise: </b>${this._sunrise}`;
        this.shadowRoot.querySelector('.weather-item__sunset').innerHTML = `<b>Sunset: </b>${this._sunset}`;
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            const event = new CustomEvent('show-large-card');
            this.dispatchEvent(event);
        });
    }    
    
    hideSmallCardList = () => {
        this.parentElement.style.display = 'none';
    }

    showSmallCardList = () => {
        this.parentElement.style.display = 'flex';
    }

}

customElements.define('small-card', SmallWeatherCard);
