import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!searchQuery.trim()) {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/all`
        );
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCountries(filteredCountries);

        // Si hay exactamente un país, seleccionarlo automáticamente
        if (filteredCountries.length === 1) {
          setSelectedCountry(filteredCountries[0]);
        } else {
          setSelectedCountry(null);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
        setSelectedCountry(null);
      }
    };

    fetchCountries();
  }, [searchQuery]);

  useEffect(() => {
    if (!selectedCountry || !selectedCountry.capital || !apiKey) {
      setWeather(null);
      return;
    }

    const fetchWeather = async () => {
      try {
        const capital = selectedCountry.capital[0];
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [selectedCountry, apiKey]);

  const renderCountryDetails = (country) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0] || "N/A"}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
      {weather ? (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );

  const renderCountries = () => {
    if (selectedCountry) {
      return renderCountryDetails(selectedCountry);
    }

    if (countries.length > 10) {
      return <p>Too many matches, please refine your search.</p>;
    } else if (countries.length > 1) {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      );
    } else if (countries.length === 1) {
      return renderCountryDetails(countries[0]);
    }

    return <p>No matches found.</p>;
  };

  return (
    <div>
      <h1>Country Information</h1>
      <label>
        Search for a country:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
      {renderCountries()}
    </div>
  );
};

export default App;
