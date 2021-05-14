// Handle to form tag
const cityForm = document.querySelector("form");
// Handle to card
const card = document.querySelector(".card");
// Handle for weather information
const deatils = document.querySelector(".details");
// Handle to the image
const img = document.querySelector("img.time");
// Handle to Icon
const icon = document.querySelector(".icon img");
// Forecast Class
const weatherForecast = new Forecast();

const updateUI = (data) => {

    // Old way of using variables
    // const cityInfo = data.cityInfo;
    // const weatherInfo = data.weatherInfo;
    // Destructuring it is an alternative to the above code
   const {cityInfo, weatherInfo} = data;

    deatils.innerHTML = `
        <h5 class="my-3">${cityInfo.EnglishName}</h5>
        <div class="my-3">${weatherInfo.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherInfo.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

        // Weather icons
        const iconimg = `icons/${weatherInfo.WeatherIcon}.svg`;
        icon.setAttribute("src", iconimg);

        // Change image according to day /night
        let imgSrc = null;
        if (weatherInfo.IsDayTime) {
            imgSrc = "/img/day.svg"; 
        }
        else {
            imgSrc = "/img/night.svg";
        }
        // Set picture to value
        img.setAttribute("src", imgSrc);



        // Remove d-none class
        if (card.classList.contains("d-none")) {
            card.classList.remove("d-none");
        } 
};


// Actively listening to user submission
cityForm.addEventListener("submit", (event) => {
    // Prevent Browser default action when submitting
    event.preventDefault();
    // Handle to form input field & remove spaces
    const city = cityForm.city.value.trim();
    // Form clear
    cityForm.reset();
    // Update city and get weather infromation
    weatherForecast.updateCity(city)
      .then(
          (data) => {
              updateUI(data);
            }
        ).catch((err) => {console.log(err);});

    // Set local storage
    localStorage.setItem("city", city);
});
// Get city name from the local storage if it has any
if (localStorage.getItem("city")) {
    weatherForecast.updateCity(localStorage.getItem("city"))
    .then((data) => {updateUI(data)})
    .catch((err) => {console.log(err);});
}
