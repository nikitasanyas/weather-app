document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.temp');
    const windSpeedElement = document.querySelector('.details-w .temp');
    const humidityElement = document.querySelector('.humidity');
    const sunriseElement = document.querySelector('.sunrise');
    const sunsetElement = document.querySelector('.sunset');
    const rainElement = document.querySelector('.rain');

    // Configuration for the pie chart
    const data = {
        labels: ['Temperature', 'Wind Speed', 'Humidity', 'Rain'],
        datasets: [{
            label: 'Weather Data',
            data: [0, 0, 0, 0], // Initial data
            backgroundColor: ['red', 'pink', 'green', 'blue']
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            plugins: {
                legend: {
                    onHover: handleHover,
                    onLeave: handleLeave
                }
            }
        }
    };

    // Initialize the chart
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    function handleHover(event, legendItem, legend) {
        document.body.style.cursor = 'pointer';
    }

    function handleLeave(event, legendItem, legend) {
        document.body.style.cursor = 'default';
    }

    searchBtn.addEventListener('click', function() {
        const city = searchInput.value;
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        const apiKey = '7013892a15a83984df3f6349c464735d';  // Replace with your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                cityElement.textContent = data.name;
                tempElement.textContent = `${data.main.temp}°C`;
                windSpeedElement.textContent = `${data.wind.speed} km/h`;
                humidityElement.textContent = `${data.main.humidity}%`;
                sunriseElement.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                sunsetElement.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                rainElement.textContent = data.rain && data.rain['1h'] ? `${data.rain['1h']} mm` : "NO RAIN";

                myChart.data.datasets[0].data = [
                    data.main.temp,
                    data.wind.speed,
                    data.main.humidity,
                    data.rain && data.rain['1h'] ? data.rain['1h'] : 0
                ];
                myChart.update();
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Could not retrieve weather data. Please try again.');
            });
    }
    
    const d = new Date();
let text = d.toTimeString();
document.getElementById("demo").innerHTML = text;


    function updateDate() {
        document.getElementById("date").innerHTML = new Date().toDateString();
    }

    // Call the updateDate function to set the date when the page loads
    updateDate();
});
