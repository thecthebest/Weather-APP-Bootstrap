class Forecast {
    constructor() {
        // API Access Key
        this.apiKey = "3vMt2nSqDWipJWKDE58xBDIlAVq8ou03";
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    }
    async updateCity (city) {
        const cityInfo = await this.getCity(city);
        const weatherInfo = await this.getWeather(cityInfo.Key);
        return {
            /*cityInfo: */cityInfo,
            /*weatherInfo: */weatherInfo
            // Object Shorthand Notation
        };
    }
    // Get City information
    async getCity(city) {
        const query = `?apikey=${this.apiKey}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    // Get Weather infromation
    async getWeather(cityKey) {
        const query = `${cityKey}?apikey=${this.apiKey}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}

// // API Access Key
// const apiKey = "3vMt2nSqDWipJWKDE58xBDIlAVq8ou03";
// // Get City information
// const getCity = async (city) => {
//     const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
//     const query = `?apikey=${apiKey}&q=${city}`;
//     const response = await fetch(base + query);
//     const data = await response.json();
//     return data[0];
// };
// // Get Weather infromation
// const getWeather = async (cityKey) => {
//     const base = "http://dataservice.accuweather.com/currentconditions/v1/";
//     const query = `${cityKey}?apikey=${apiKey}`;
//     const response = await fetch(base + query);
//     const data = await response.json();
//     return data[0];
// };