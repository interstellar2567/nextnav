import React, { useState, useEffect } from 'react';

// Real OpenWeatherMap API configuration
const API_KEY = "28ccb41f5faf897736d39d0ead48882e"; // Your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";
// Use 2.5 endpoint which is free
const ONE_CALL_URL = "https://api.openweathermap.org/data/2.5/onecall";

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [forecast, setForecast] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [theme, setTheme] = useState('light');
  const [selectedDay, setSelectedDay] = useState(null);
  const [showHourly, setShowHourly] = useState(false);
  const [airQuality, setAirQuality] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [mapUrl, setMapUrl] = useState('');

  // Get user's location on initial load
  useEffect(() => {
    // Load saved preferences from localStorage
    const savedUnit = localStorage.getItem('temperatureUnit');
    if (savedUnit) {
      setUnit(savedUnit);
    }

    const savedTheme = localStorage.getItem('weatherTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    const savedFavorites = localStorage.getItem('favoriteLocations');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    getUserLocation();
  }, []);


  const getUserLocation = () => {
    setLoading(true);
    setError('');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Could not determine your location. Please search for a city instead.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city instead.");
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');

    try {
      // Current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.statusText}`);
      }

      const weatherData = await weatherResponse.json();

      // Use the 5-day forecast API instead of One Call
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.statusText}`);
      }

      const forecastData = await forecastResponse.json();

      // Air Quality
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!airQualityResponse.ok) {
        throw new Error(`Air Quality API error: ${airQualityResponse.statusText}`);
      }

      const airQualityData = await airQualityResponse.json();

      // Process the data - modified to work with forecast data instead of one call
      processWeatherData(weatherData, forecastData, airQualityData);

      // Add to recent searches if we have a city name
      if (weatherData.name) {
        addToRecentSearches(weatherData.name);
      }

      setLoading(false);

      // Reset alert message as we don't have alerts in the free tier
      setAlertMessage('');

    } catch (err) {
      console.error("API Error:", err);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError('');

    try {
      // Current weather by city name
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error("City not found. Please check the spelling and try again.");
        }
        throw new Error(`Weather API error: ${weatherResponse.statusText}`);
      }

      const weatherData = await weatherResponse.json();

      // Use coordinates from city lookup to get forecast data
      const { lat, lon } = weatherData.coord;

      // 5-day forecast API
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.statusText}`);
      }

      const forecastData = await forecastResponse.json();

      // Air Quality
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!airQualityResponse.ok) {
        throw new Error(`Air Quality API error: ${airQualityResponse.statusText}`);
      }

      const airQualityData = await airQualityResponse.json();

      // Process the data - modified for forecast API
      processWeatherData(weatherData, forecastData, airQualityData);

      // Add to recent searches
      addToRecentSearches(weatherData.name);

      setLoading(false);

      // Reset alert message
      setAlertMessage('');

    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const processWeatherData = (weatherData, forecastData, airQualityData) => {
    // Current weather processing
      const processedWeather = {
        location: weatherData.name,
        country: weatherData.sys.country,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].main,
        conditionDescription: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        windDirection: getWindDirection(weatherData.wind.deg),
        feelsLike: weatherData.main.feels_like,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility / 1000, // convert to km
        uvIndex: 0, // Not available in free tier, defaulting to 0
        sunrise: formatTime(weatherData.sys.sunrise * 1000),
        sunset: formatTime(weatherData.sys.sunset * 1000),
        updatedAt: formatTime(new Date().getTime()),
        icon: weatherData.weather[0].icon,
        precipProbability: forecastData.list[0]?.pop ? forecastData.list[0].pop * 100 : 0, // probability of precipitation
        cloudCover: weatherData.clouds.all,
        coordinates: {
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon
        }
      };

      // Generate OpenStreetMap URL
      const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${weatherData.coord.lon - 0.1},${weatherData.coord.lat - 0.1},${weatherData.coord.lon + 0.1},${weatherData.coord.lat + 0.1}&layer=mapnik`;
      setMapUrl(mapUrl);

      // Air quality processing
      const aqiData = {
        aqi: airQualityData.list[0].main.aqi,
        components: airQualityData.list[0].components
      };

      // Process forecast data (daily) from 5-day/3-hour forecast
      const dailyForecasts = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        if (!dailyForecasts[day]) {
          dailyForecasts[day] = {
            temps: [],
            conditions: [],
            icons: [],
            precipitation: [],
            dt: item.dt,
            hourlyForecast: []
          };
        }
        dailyForecasts[day].temps.push(item.main.temp);
        dailyForecasts[day].conditions.push(item.weather[0].main);
        dailyForecasts[day].icons.push(item.weather[0].icon);
        dailyForecasts[day].precipitation.push(item.pop || 0);
        dailyForecasts[day].hourlyForecast.push({
          time: formatHour(item.dt * 1000),
          temperature: item.main.temp,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          precipProbability: (item.pop || 0) * 100
        });
      });

      const forecastArray = Object.keys(dailyForecasts).slice(0, 5).map(day => {
        const forecast = dailyForecasts[day];
        const mostCommonCondition = Object.keys(forecast.conditions.reduce((acc, condition) => {
          acc[condition] = (acc[condition] || 0) + 1;
          return acc;
        }, {})).reduce((a, b) => forecast.conditions[a] > forecast.conditions[b] ? a : b);
        const mostCommonIcon = Object.keys(forecast.icons.reduce((acc, icon) => {
          acc[icon] = (acc[icon] || 0) + 1;
          return acc;
        }, {})).reduce((a, b) => forecast.icons[a] > forecast.icons[b] ? a : b);
        return {
          day: formatDay(forecast.dt * 1000),
          date: formatDate(forecast.dt * 1000),
          condition: mostCommonCondition,
          conditionDescription: mostCommonCondition,
          icon: mostCommonIcon,
          highTemp: Math.max(...forecast.temps),
          lowTemp: Math.min(...forecast.temps),
          precipProbability: Math.max(...forecast.precipitation) * 100,
          hourlyForecast: forecast.hourlyForecast.filter((_, index) => index % 2 === 0)
        };
      });

      setWeather(processedWeather);
      setForecast(forecastArray);
      setAirQuality(aqiData);
    };

    const handleSearch = async () => {
      if (!location.trim()) return;
      await fetchWeatherByCity(location);
    };

    const addToRecentSearches = (location) => {
      // Add to recent searches (avoid duplicates and limit to 5)
      const updatedSearches = [
        location,
        ...recentSearches.filter(item => item !== location)
      ].slice(0, 5);

      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const toggleUnit = () => {
      const newUnit = unit === 'metric' ? 'imperial' : 'metric';
      setUnit(newUnit);
      localStorage.setItem('temperatureUnit', newUnit);

      // Refresh data with new unit
      if (weather) {
        if (weather.coordinates) {
          fetchWeatherByCoords(weather.coordinates.lat, weather.coordinates.lon);
        } else {
          fetchWeatherByCity(weather.location);
        }
      }
    };

    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('weatherTheme', newTheme);
    };

    const handleDayClick = (day) => {
      if (selectedDay === day) {
        setSelectedDay(null);
        setShowHourly(false);
      } else {
        setSelectedDay(day);
        setShowHourly(true);
      }
    };

    const toggleFavorite = () => {
      if (!weather) return;

      const locationName = `${weather.location}, ${weather.country}`;

      if (favorites.some(fav => fav.name === locationName)) {
        // Remove from favorites
        const updatedFavorites = favorites.filter(fav => fav.name !== locationName);
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
      } else {
        // Add to favorites
        const newFavorite = {
          name: locationName,
          lat: weather.coordinates.lat,
          lon: weather.coordinates.lon
        };

        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
      }
    };

    const isLocationFavorite = () => {
      if (!weather) return false;

      const locationName = `${weather.location}, ${weather.country}`;
      return favorites.some(fav => fav.name === locationName);
    };

    // Helper functions
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDay = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString([], { weekday: 'long' });
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const formatHour = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit' });
    };

    const getWindDirection = (degrees) => {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      return directions[Math.round(degrees / 45) % 8];
    };

    const getWeatherIcon = (iconCode) => {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    const getAqiCategory = (aqi) => {
      switch (aqi) {
        case 1: return { label: 'Good', color: 'text-green-400' };
        case 2: return { label: 'Fair', color: 'text-green-300' };
        case 3: return { label: 'Moderate', color: 'text-yellow-400' };
        case 4: return { label: 'Poor', color: 'text-orange-400' };
        case 5: return { label: 'Very Poor', color: 'text-red-400' };
        default: return { label: 'Unknown', color: 'text-gray-400' };
      }
    };

    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-500 ${theme === 'light'
          ? 'bg-gradient-to-b from-blue-400 to-blue-600'
          : 'bg-gradient-to-b from-gray-800 to-gray-900'
        }`}>
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Weather Forecast</h1>
              <div className="flex gap-2">
                <button
                  onClick={getUserLocation}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  title="Get weather for your current location"
                >
                  📍
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
                {weather && (
                  <button
                    onClick={toggleFavorite}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    title={isLocationFavorite() ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isLocationFavorite() ? '❤️' : '🤍'}
                  </button>
                )}
                {weather && (
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    title={showMap ? 'Hide map' : 'Show map'}
                  >
                    🗺️
                  </button>
                )}
              </div>
            </div>

            <div className="flex mb-6">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location..."
                className="flex-1 px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
              >
                Search
              </button>
            </div>

            {/* Recent searches and favorites */}
            <div className="mb-6 overflow-x-auto">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <p className="text-white/80 text-sm mb-2">Recent searches:</p>
                  <div className="flex gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setLocation(search);
                          fetchWeatherByCity(search);
                        }}
                        className="px-3 py-1 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors whitespace-nowrap"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {favorites.length > 0 && (
                <div>
                  <p className="text-white/80 text-sm mb-2">Favorites:</p>
                  <div className="flex gap-2 flex-wrap">
                    {favorites.map((fav, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          fetchWeatherByCoords(fav.lat, fav.lon);
                        }}
                        className="px-3 py-1 bg-pink-500/30 text-white rounded-full text-sm hover:bg-pink-500/50 transition-colors whitespace-nowrap"
                      >
                        {fav.name} ❤️
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alert messages */}
            {alertMessage && (
              <div className="bg-yellow-500/70 text-white p-4 rounded-lg mb-4 animate-fade-in">
                <p className="font-bold">⚠️ Weather Alert:</p>
                <p>{alertMessage}</p>
              </div>
            )}

            {loading && (
              <div className="flex justify-center my-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/80 text-white p-4 rounded-lg mb-4 animate-fade-in">
                {error}
              </div>
            )}

            {weather && !loading && (
              <div className="animate-fade-in transition-all duration-500">
                {/* Map view - Fixed implementation */}
                {showMap && (
                  <div className="mb-6 bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-white font-bold mb-2">Location Map</h3>
                    <div className="aspect-video bg-white/30 rounded overflow-hidden relative">
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        title="Location Map"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                        {weather.location}, {weather.country} ({weather.coordinates.lat.toFixed(2)}, {weather.coordinates.lon.toFixed(2)})
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 overflow-hidden rounded-lg mb-4 md:mb-0 transition-all duration-300 hover:scale-105">
                      <img
                        src={getWeatherIcon(weather.icon)}
                        alt={weather.condition}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{weather.location}, {weather.country}</h2>
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-bold text-white">
                          {Math.round(weather.temperature)}°{unit === 'metric' ? 'C' : 'F'}
                        </span>
                        <button
                          onClick={toggleUnit}
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
                        </button>
                      </div>
                      <p className="text-xl text-white mt-1 capitalize">{weather.conditionDescription}</p>
                      <p className="text-white/80">
                        Feels like {Math.round(weather.feelsLike)}°{unit === 'metric' ? 'C' : 'F'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-white/70">Humidity</p>
                      <p className="text-xl font-semibold text-white">{weather.humidity}%</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-white/70">Wind</p>
                      <p className="text-xl font-semibold text-white">
                        {weather.windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}
                      </p>
                      <p className="text-sm text-white/70">{weather.windDirection}</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-white/70">Pressure</p>
                      <p className="text-xl font-semibold text-white">{weather.pressure} hPa</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-white/70">UV Index</p>
                      <p className="text-xl font-semibold text-white">{weather.uvIndex}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {airQuality && (
                      <div className="bg-white/15 p-4 rounded-lg backdrop-blur-sm">
                        <p className="text-sm text-white/70">Air Quality</p>
                        <p className="text-xl font-semibold text-white">
                          {airQuality.aqi} - <span className={getAqiCategory(airQuality.aqi).color}>
                            {getAqiCategory(airQuality.aqi).label}
                          </span>
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-white/60">CO: {airQuality.components.co.toFixed(1)}</p>
                            <p className="text-xs text-white/60">NO: {airQuality.components.no.toFixed(1)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/60">PM2.5: {airQuality.components.pm2_5.toFixed(1)}</p>
                            <p className="text-xs text-white/60">PM10: {airQuality.components.pm10.toFixed(1)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="bg-white/15 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-white/70">Precipitation</p>
                      <p className="text-xl font-semibold text-white">{Math.round(weather.precipProbability)}% chance</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-white font-semibold mb-2">Additional Info</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-3 rounded">
                        <p className="text-sm text-white/70">Visibility</p>
                        <p className="text-white">{weather.visibility} km</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded">
                        <p className="text-sm text-white/70">Cloud Cover</p>
                        <p className="text-white">{weather.cloudCover}%</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded">
                        <p className="text-sm text-white/70">Sunrise</p>
                        <p className="text-white">{weather.sunrise}</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded">
                        <p className="text-sm text-white/70">Sunset</p>
                        <p className="text-white">{weather.sunset}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forecast section */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
                  <div className="space-y-3">
                    {forecast.map((day, index) => (
                      <div key={index}>
                        <div
                          className={`bg-white/20 p-4 rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer ${selectedDay === index ? 'bg-white/30' : 'hover:bg-white/25'}`}
                          onClick={() => handleDayClick(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">                              <p className="font-semibold text-white">{day.day}</p>
                                <p className="text-white/70 text-sm">{day.date}</p>
                              </div>
                              <img
                                src={getWeatherIcon(day.icon)}
                                alt={day.condition}
                                className="w-10 h-10"
                              />
                              <div>
                                <p className="text-white capitalize">{day.conditionDescription}</p>
                                <p className="text-white/70 text-sm">
                                  {Math.round(day.precipProbability)}% precip
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">
                                {Math.round(day.highTemp)}° / {Math.round(day.lowTemp)}°
                              </p>
                              <p className="text-white/70 text-sm">
                                {selectedDay === index ? 'Click to hide details' : 'Click for hourly'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Hourly forecast */}
                        {selectedDay === index && showHourly && (
                          <div className="mt-2 p-4 bg-white/15 rounded-lg backdrop-blur-sm overflow-x-auto animate-fade-in">
                            <div className="flex gap-4 min-w-max">
                              {day.hourlyForecast.map((hour, hourIndex) => (
                                <div key={hourIndex} className="flex flex-col items-center p-2 min-w-fit">
                                  <p className="text-white font-medium">{hour.time}</p>
                                  <img
                                    src={getWeatherIcon(hour.icon)}
                                    alt={hour.condition}
                                    className="w-8 h-8 my-1"
                                  />
                                  <p className="text-white">{Math.round(hour.temperature)}°</p>
                                  <p className="text-white/70 text-xs">{Math.round(hour.precipProbability)}%</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-8 text-white/80 text-sm">
                  Last updated: {weather.updatedAt}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Weather;