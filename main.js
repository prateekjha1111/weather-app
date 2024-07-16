var apiKey = '24d68980f28e448eb1b62536241607';
async function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
        document.querySelector('.weather').style.display = 'none'; 
        document.querySelector('.name').innerHTML = 'Invalid city name! Try again 😊';
        throw new Error(`Invalid city name: ${response.statusText}`);
    }
    
      const data = await response.json();
      console.log(data);

      document.querySelector('.location1 .city').innerHTML = data.location.name;
      document.querySelector('.location2 .country-name').innerHTML = data.location.country;

      let latitude = data.location.lat;
      if(latitude > 0) {
        document.querySelector('.location1 .lat').innerHTML = latitude + '° N,';
      }
      else {
        document.querySelector('.location1 .lat').innerHTML = latitude + '° S';
      }

      let longitude = data.location.lon;
      if(longitude > 0) {
        document.querySelector('.location2 .lon').innerHTML = longitude + '° E';
      }
      else {
        document.querySelector('.location2 .lon').innerHTML = longitude + '° W';
      }

      document.querySelector('.temp-row .temp').innerHTML = Math.round(data.current.temp_c) + '°c';
      document.querySelector('.condition h4').innerHTML = data.current.condition.text;
      document.querySelector('.condition img').setAttribute('src', data.current.condition.icon);
      document.querySelector('.wind h1').innerHTML = Math.round(data.current.wind_kph) + ' km/h';
      document.querySelector('.humidity h1').innerHTML = data.current.humidity + '%';

      document.querySelector('.weather').style.display = 'block';
      document.querySelector('.name').innerHTML = 'Developed with ❤️ by Prateek';
  } catch (error) {
      console.error('Error fetching the weather data:', error);
      document.querySelector('.weather').style.display = 'none';
  }
}

document.querySelector('.search-icon').addEventListener('click', () => {
  let city_name = document.querySelector('.inp').value; 
  fetchWeather(city_name);
});
