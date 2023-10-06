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
 .weather-item__large-card {
    padding: 0.5rem;
    position: relative;
    margin-top: 5rem;
  }
  
  .weather-item-large-card__back {
    position: absolute;
    padding: 0 1rem;
    border-radius: 0.25rem;
    border-style: none;
    font-size: 1.5rem;
    background-color: inherit;
    color: white;
  }
  
  .weather-item-large-card__back span {
    transition: transform 0.12s ease-in-out;
  }

  .weather-item-large-card__back span:hover {
    transform: scale(1.2);
  }
  
  .weather-item-large__top {
    background-color: #388ee7;
    padding: 0 0  2rem 0;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  
  .weather-item-large-top__top {
    padding-top: 2rem;
    text-align: center;
  }
  
  .weather-item-large-top__bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }
  
  .weather-item-large-top-bottom__weather-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 1rem;
  }
  
  .weather-item-large-top-bottom__weather-description img {
    height: 4rem;
  }
  
  .weather-item-large-top-bottom__temperatures {
    text-align: center;
    border-left: 2px solid #ececec;
    padding-left: 1rem;
  }
  
  .weather-item-large__temperature {
    font-size: 3rem;
    line-height: 1;
  }
  
  .weather-item-large__bottom {
    background-color: #383b47;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    display: flex;
    font-size: 0.7rem;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
  }
  
  .weather-item-large-bottom__left {
    text-align: left;
    padding-right: 1rem;
    text-wrap: nowrap;
  }
  
  .weather-item-large-bottom__middle {
    padding: 0 0.5rem;
    text-align: center;
    border-left: 2px solid #515566;
    border-right: 2px solid #515566;
    text-wrap: nowrap;
  }
  
  .weather-item-large-bottom__right {
    text-align: right;
    padding-left: 1rem;
    text-wrap: nowrap;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    .weather-item__large-card {
      padding: 0.5rem 2rem;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .weather-item__large-card {
      padding: 0.5rem 4rem;
    }
  
    .weather-item-large-top-bottom__weather-description {
      padding-right: 1rem;
    }
  
    .weather-item-large-top-bottom__temperatures {
      padding-left: 1rem;
    }
  
    .weather-item-large-bottom__left {
      padding-right: 1rem;
    }
  
    .weather-item-large-bottom__middle {
      padding: 0 0.5rem;
    }
  
    .weather-item-large-bottom__right {
      padding-left: 1rem;
    }
  
    .weather-item-large__bottom {
      font-size: 1rem;
    }
  }
  
  @media (min-width: 1025px) and (max-width: 1200px) {
    .weather-item__large-card {
      padding: 0.5rem 6rem;
    }
  
    .weather-item-large__top {
      padding: 0 0 2rem 0;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  
    .weather-item-large-card__back {
      border-radius: 0.5rem;
    }
  
    .weather-item-large-top-bottom__weather-description {
      padding-right: 3rem;
    }
  
    .weather-item-large-top-bottom__temperatures {
      padding-left: 3rem;
    }
  
    .weather-item-large-bottom__left {
      padding-right: 3rem;
    }
  
    .weather-item-large-bottom__middle {
      padding: 0 2rem;
    }
  
    .weather-item-large-bottom__right {
      padding-left: 3rem;
    }
  
    .weather-item-large__bottom {
      font-size: 1rem;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
  
  @media (min-width: 1201px) {
    .weather-item__large-card {
      padding: 0.5rem 10rem;
    }
  
    .weather-item-large-card__back {
      border-radius: 0.5rem;
    }
  
    .weather-item-large__top {
      padding: 0 0 3rem 0;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  
    .weather-item-large-top__top {
      padding-bottom: 2rem;
    }
  
    .weather-item-large-top-bottom__weather-description {
      padding-right: 4rem;
    }
  
    .weather-item-large-top-bottom__temperatures {
      padding-left: 4rem;
    }
  
    .weather-item-large-bottom__left {
      padding-right: 4rem;
    }
  
    .weather-item-large-bottom__middle {
      padding: 0 4rem;
    }
  
    .weather-item-large-bottom__right {
      padding-left: 4rem;
    }
  
    .weather-item-large__bottom {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      font-size: 1rem;
    }
  }
</style>
<div class="weather-item__large-card">
    <section class="weather-item-large__top" >
        <button class="weather-item-large-card__back" type="button"><span>&larr;</span></button>
        <div class="weather-item-large-top__top">
            <h2 class="weather-item-large__city"></h2>
            <span class="weather-item-large__date"></span>
        </div>
        <div class="weather-item-large-top__bottom">
            <div class="weather-item-large-top-bottom__weather-description">
                <img alt="image" class="weather-description__image-large">
                <span class="weather-description__large"></span>
            </div>
            <div class="weather-item-large-top-bottom__temperatures">
                <span class="weather-item-large__temperature"></span>
                <span class="weather-item-large__temperature-min"></span>
                <span class="weather-item-large__temperature-max"></span>
            </div>
        </div>
    </section>
    <section class="weather-item-large__bottom">
        <div class="weather-item-large-bottom__left">
            <span class="weather-item-large__pressure"></span>
            <span class="weather-item-large__humidity"></span>
            <span class="weather-item-large__visibility"></span>
        </div>
        <div class="weather-item-large-bottom__middle">
            <img src="/images/direction.png" alt="image" />
            <span class="weather-item-large__wind-details"></span>
        </div>
        <div class="weather-item-large-bottom__right">
            <span class="weather-item-large__sunrise"></span>
            <span class="weather-item-large__sunset"></span>
        </div>
    </section>
</div>
`;

export class LargeWeatherCard extends HTMLElement {
    static cardNumber = 0;
    constructor(weatherObj) {
        super();

        LargeWeatherCard.cardNumber++;
        this.colorId = LargeWeatherCard.cardNumber;

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
        this.shadowRoot.querySelector('.weather-item-large__top').style.backgroundColor = colors[this.colorId % 5];
        this.shadowRoot.querySelector('.weather-item__large-card').setAttribute('id', this.colorId);
        
        this.shadowRoot.querySelector('.weather-item-large__city').textContent = `${this._cityName}, ${this._country}`;
        this.shadowRoot.querySelector('.weather-item-large__date').textContent = `${this._time}, ${this._date}`;
        this.shadowRoot.querySelector('.weather-item-large__temperature').innerHTML = `${this._temperature}&deg;c`;
        this.shadowRoot.querySelector('.weather-description__image-large').src = `${this._iconURL}`;
        this.shadowRoot.querySelector('.weather-description__large').textContent = `${this._description}`;
        this.shadowRoot.querySelector('.weather-item-large__temperature-min').innerHTML = `<b>Temp Min:</b> ${this._minTemp}&deg;c`;
        this.shadowRoot.querySelector('.weather-item-large__temperature-max').innerHTML = `<b>Temp Max:</b> ${this._maxTemp}&deg;c`;
        this.shadowRoot.querySelector('.weather-item-large__pressure').innerHTML = `<b>Pressure: </b>${this._pressure}hPa`;
        this.shadowRoot.querySelector('.weather-item-large__humidity').innerHTML = `<b>Humidity: </b>${this._humidity}%`;
        this.shadowRoot.querySelector('.weather-item-large__visibility').innerHTML = `<b>Visibility: </b>${this._visibility}km`;
        this.shadowRoot.querySelector('.weather-item-large__wind-details').textContent = `${this._windSpeed}m/s ${this._windDirection} degrees`;
        this.shadowRoot.querySelector('.weather-item-large__sunrise').innerHTML = `<b>Sunrise: </b>${this._sunrise}`;
        this.shadowRoot.querySelector('.weather-item-large__sunset').innerHTML = `<b>Sunset: </b>${this._sunset}`;
    }

    connectedCallback() {
        const backBtn = this.shadowRoot.querySelector('.weather-item-large-card__back');
        backBtn.addEventListener('click', () => {
            const event = new CustomEvent('show-small-cards');
            this.dispatchEvent(event);
        });
    }
    
    showLargeCard = () => {
        document.querySelector('.weather-container').appendChild(this);
    }

    backBtnHandler = () => {
        document.querySelector('.weather-container').removeChild(this);
    }
}

customElements.define('large-card', LargeWeatherCard);