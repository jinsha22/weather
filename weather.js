const button = document.getElementById('getloc');
const result = document.getElementById('result'); // Assuming there's an element with id 'result' in your HTML

async function getData(lat, long) {
    try {
        const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=967b79616f4148bf973180351230312&q=${lat},${long}&aqi=yes
            `);
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        data = data.current.temp_c;

        return data; // Return the temperature data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function gotLocation(position) {
    try {
        let temperature = await getData(position.coords.latitude, position.coords.longitude);
        result.innerHTML = `
            <h5 class="a8">Present atmospheric conditions at your current local is  ${temperature}°C</h5>
        `;
    } catch (error) {
        console.error('Error getting location:', error);
        // Handle the error as needed
    }
}

function failedToGet() {
    console.log('There was some issue');
}

button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});

button.addEventListener('touchstart', async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});

function locationSearch(){
    city=data.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b4bee0ba241d092159faf007e166080`).then(response=>response.json()).then(out=>displayData(out))
}

function displayData(ObjWeather){
    name=ObjWeather.name
    temperature = ObjWeather.main.temp-273.15
    feels_like = ObjWeather.main.feels_like- 273.15
    humidity = ObjWeather.main.humidity
    air = ObjWeather.main.pressure
    max = ObjWeather.main.temp_max - 273.15





    result.innerHTML=`<div class="card text-white" ">

                          <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                          </div>
                       <ul class="list-group list-group-flush">
                        <li class="list-group-item">Temperature : ${temperature.toFixed(2)}</li>
                        <li class="list-group-item"> Max Temperature : ${max.toFixed(2)}</li>

                        
                        <li class="list-group-item"> Feels Like : ${feels_like.toFixed(2)}</li>
                        <li class="list-group-item">Humidity : ${humidity}</li>
                        <li class="list-group-item">Pressure : ${air}</li>
                       </ul>

                     </div>` 

    
}

