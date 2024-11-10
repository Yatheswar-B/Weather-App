const cityInput=document.querySelector('.city-input');
const searchBtn=document.querySelector('.search-btn');
const notFoundSection=document.querySelector('.not-found')
const apikey='e099a2d239cae72dda73f818e5fc498c';
const searchCitySection =document.querySelector('.search-city');
const weatherInfoSection =document.querySelector('.weather-info');
const countrytxt=document.querySelector('.country-txt');
const currentDataTxt=document.querySelector('.current-data-txt');
const weatherSummaryImg=document.querySelector('.weather-summary-img');
const tempTxt=document.querySelector('.temp-txt');
const conditionTxt=document.querySelector('.condition-txt');
const humidityValueTxt=document.querySelector('.humidity-value-txt');
const windSpeed=document.querySelector('.windspeed');
const forecastItems=document.querySelector('.forecast-items-container');


searchBtn.addEventListener('click',()=>{
    if (cityInput.value.trim() != '') {
        forecastItems.innerHTML='';
        updateweatherInfo(cityInput.value);
        cityInput.value='';
        cityInput.blur();
    }
})

cityInput.addEventListener('keydown',(event)=>{
    if (event.key=="Enter" && cityInput.value.trim() != '') {
        forecastItems.innerHTML='';
        updateweatherInfo(cityInput.value);
        cityInput.value='';
        cityInput.blur();
    }
})

async function getFetchData(endpoint,city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`;
    return fetch(apiUrl).then(response => response.json());
}

 async function updateweatherInfo(city) {
    const weatherData=await getFetchData('weather',city);
    if (weatherData.cod != 200) {
        showDisplaySection();
        return;
    }
    else{
        searchCitySection.style.display='none'
        weatherInfoSection.style.display='block';
        notFoundSection.style.display='none'
        const date = new Date();
        const options = {
          weekday: "short", 
          day: "2-digit",     
          month: "short" 
        };
        countrytxt.innerText=weatherData.name;
        currentDataTxt.innerText=date.toLocaleDateString("en-US", options);
         console.log(weatherData.weather[0].id);
         
        if (weatherData.weather[0].id>=200 && weatherData.weather[0].id<=232) {
            weatherSummaryImg.src='./assets/weather/thunderstorm.svg';
        }
        else{
            if (weatherData.weather[0].id>=300 && weatherData.weather[0].id<=321) {
                weatherSummaryImg.src='./assets/weather/drizzle.svg';
            }
            else{
                if (weatherData.weather[0].id>=500 && weatherData.weather[0].id<=531) {
                    weatherSummaryImg.src='./assets/weather/rain.svg';
                }
                else{
                    if (weatherData.weather[0].id>=600 && weatherData.weather[0].id<=622) {
                        weatherSummaryImg.src='./assets/weather/snow.svg';
                    }
                    else{
                        if (weatherData.weather[0].id>=801 && weatherData.weather[0].id<=804) {
                            weatherSummaryImg.src='./assets/weather/clouds.svg';
                        }
                        else{
                            if (weatherData.weather[0].id==800 ) {
                                weatherSummaryImg.src='./assets/weather/clear.svg';
                            }
                        }
                    }
                }
            }
        }
        tempTxt.innerText=weatherData.main.temp+"℃";
        console.log(weatherData.main.temp);
        conditionTxt.innerText=weatherData.weather[0].main;
        humidityValueTxt.innerText=weatherData.main.humidity+"%";
        windSpeed.innerText=weatherData.wind.speed+"km/s";
        await updateForecastInfo(city);
        locationImgSearch(city);
        
    }
    
 }

 async function updateForecastInfo(city) {
    const forecastData=await getFetchData('forecast',city)
    console.log(forecastData);
    let src='';
     forecastData.list.forEach(object => {
        if (object.dt_txt.slice(8,10)!=new Date().getDate()) {
            if (object.dt_txt.slice(11)=='12:00:00') {
             
                if (object.weather[0].id>=200 && object.weather[0].id<=232) {
                src='./assets/weather/thunderstorm.svg';
                }
                else{
                    if (object.weather[0].id>=300 && object.weather[0].id<=321) {
                        src='./assets/weather/drizzle.svg';
                    }
                    else{
                        if (object.weather[0].id>=500 && object.weather[0].id<=531) {
                            src='./assets/weather/rain.svg';
                        }
                        else{
                            if (object.weather[0].id>=600 && object.weather[0].id<=622) {
                                src='./assets/weather/snow.svg';
                            }
                            else{
                                if (object.weather[0].id>=801 && object.weather[0].id<=804) {
                                    src='./assets/weather/clouds.svg';
                                }
                                else{
                                    if (object.weather[0].id==800 ) {
                                        src='./assets/weather/clear.svg';
                                    }
                                }
                            }
                        }
                    }
                }
                    console.log(object.main.temp);
                    const dateStr = object.dt_txt.slice(0,10); 
                    const date = new Date(dateStr);
                   const options = { day: "numeric", month: "short" }; 
                   const formattedDate = date.toLocaleDateString("en-US", options);
                   const forecastItem=document.createElement('div');
                   forecastItem.setAttribute('class','forecast-item');
                   forecastItem.innerHTML=`<h5 class="forecast-item-date regular-txt">${formattedDate}</h5>
                    <img src="${src}" alt="" class="forecast-item-img">
                    <h5 class="forecast-item-temp">${object.main.temp}</h5>`;
                    forecastItems.appendChild(forecastItem);
            }
        }
       
    });
    
    
 }

 function showDisplaySection() {
    searchCitySection.style.display='none'
    notFoundSection.style.display='block'
 }


 async function locationImg(location) {
    const photoapikey='y1sS7VViavPl-uN26hK5hNrw3kqfFcJO9gPnIeg6TUU';
    const url=`https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=${photoapikey}`;
     return await fetch(url).then((response)=>{
        return response.json()
     });
}

async function locationImgSearch(location) {
    let data1=await locationImg(location);
    console.log(data1);
    document.body.style.backgroundImage=`url(${data1.results[0].urls.full})`;
    document.body.style.backgroundImage
}
 

 

   