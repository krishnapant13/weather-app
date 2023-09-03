import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity, fetchWeatherRequest } from "../redux/actions";
import { BsSearch } from "react-icons/bs";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import Lottie from "react-lottie";
import animationData from "../weatherGif/locationNotFound.json";

import sunnyImage from "../weatherGif/sunny.jpeg";
import cloudImage from "../weatherGif/cloud.gif";
import thunderstormImage from "../weatherGif/thunderstorm.gif";
import rainImage from "../weatherGif/rain.gif";
import snowImage from "../weatherGif/snow.gif";
import hazeImage from "../weatherGif/haze.jpg";
import scattered from "../weatherGif/scattered.jpeg";
import allWeather from "../weatherGif/allweather.jpeg";

import sunGif from "../weatherGif/sun.gif";
import scatteredCloud from "../weatherGif/cloudImg.gif";
import lessCloud from "../weatherGif/lessCloud.gif";
import clouds from "../weatherGif/Clouds.gif";
import drizzle from "../weatherGif/drizzle.gif";
import rain from "../weatherGif/rain1.gif";
import snow from "../weatherGif/snowy.gif";
import thunder from "../weatherGif/thunder.gif";
import wind from "../weatherGif/windy.gif";

const WeatherDisplay = () => {
  const dispatch = useDispatch();

  const selectedCity = useSelector((state) => state.selectedCity);
  const weatherData = useSelector((state) => state.weatherData);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const [searchCity, setSearchCity] = useState("Delhi");
  const [bgGif, setBGGif] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    dispatch(setSelectedCity("Delhi"));
    dispatch(fetchWeatherRequest("Delhi"));
  }, [dispatch]);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const weatherBackgrounds = {
    "clear sky": sunnyImage,
    "scattered clouds": scattered,
    "overcast clouds": cloudImage,
    "few clouds": cloudImage,
    "broken clouds": cloudImage,
    Thunderstorm: thunderstormImage,
    rain: rainImage,
    "light rain": rainImage,
    "moderate rain": rainImage,
    snow: snowImage,
    drizzle: rainImage,
    haze: hazeImage,
    mist: hazeImage,
    tornado: thunderstormImage,
    sandstorm: thunderstormImage,
    dust: hazeImage,
    squalls: rainImage,
    fog: hazeImage,
    smoke: hazeImage,
  };

  const weatherGifs = {
    "clear sky": sunGif,
    "scattered clouds": scatteredCloud,
    "overcast clouds": lessCloud,
    "few clouds": lessCloud,
    "broken clouds": lessCloud,
    clouds: clouds,
    thunderstorm: thunder,
    tornado: thunder,
    sandstorm: thunder,
    dust: thunder,
    rain: rain,
    squalls: rain,
    "light rain": rain,
    "moderate rain": rain,
    snow: snow,
    drizzle: drizzle,
    haze: wind,
    mist: wind,
    fog: wind,
    smoke: wind,
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getImageUrl = (description) => {
    const backgroundImage = weatherBackgrounds[description];
    return backgroundImage || "";
  };
  const getWeatherIcon = (description) => {
    const icons = weatherGifs[description];
    return icons || "";
  };

  useEffect(() => {
    if (weatherData?.weather && weatherData?.weather[0]) {
      setBGGif(getImageUrl(weatherData.weather[0].description));
      setWeatherIcon(getWeatherIcon(weatherData.weather[0].description));
    } else {
      setBGGif(sunnyImage);
      setWeatherIcon(sunGif);
    }
  }, [weatherData, getImageUrl, getWeatherIcon]);

  const handleSearchChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchCity) {
      dispatch(setSelectedCity(searchCity));
      dispatch(fetchWeatherRequest(searchCity));
    }
  };
  return (
    <div className="w-full main-weather-div bg-[#000000af] h-screen flex justify-center">
      <div
        className=" bg-no-repeat bg-cover md:flex hidden  w-[30%]   relative "
        style={{ backgroundImage: `url(${error ? allWeather : bgGif})` }}
      >
        {weatherData && (
          <div className=" text-white">
            <h2 className="text-[2em] absolute top-2 right-2">
              {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
            </h2>
            <h2 className="text-[1.5em] absolute top-[2em] right-2">
              {weatherData.sys.country}
            </h2>
            <h1 className="821px:text-[5em] text-[3em]  absolute bottom-0  821px:right-10 right-1">
              {weatherData.main.temp}°C
            </h1>
            <h5 className="821px:text-[2em] text-[1.5em] absolute bottom-[1em] left-2">
              {formattedHours}:{minutes}:{seconds} {ampm}{" "}
            </h5>
            <div className="flex justify-center items-center absolute bottom-[0.5em] left-2">
              <p>{formattedDate}</p>
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col justify-center items-center  bg-[#282a33] relative md:w-[30%] w-full`}
      >
        <div className="flex flex-col justify-center items-center absolute top-[1em] translate-1/2">
          {error ? (
            <TiWeatherWindyCloudy size={100} color="white" />
          ) : (
            <img
              src={weatherIcon}
              className="w-[10em] h-[10em]"
              alt="weatherIcon"
            />
          )}
          <p className="text-[2em] text-white text-center">
            {weatherData?.weather[0].description.toUpperCase()}
          </p>
          <div className="bg-[#ffffff7a] h-[0.1em] w-full m-1" />
        </div>
        <div className="absolute bottom-[1em] w-full text-center">
          <form onSubmit={handleSearchClick} className="mt-4 ">
            <div className="w-full flex justify-evenly">
              <input
                type="text"
                placeholder="Search city..."
                value={searchCity}
                onChange={handleSearchChange}
                className="p-3 w-[68%] bg-transparent border border-l-0 border-t-0 border-r-0 text-white  hover:bg-transparent focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="w-[2.5em] h-[2.5em] bg-[#ffffff54] rounded-full p-2"
              >
                <BsSearch size={20} color="white" className="ml-[0.1em]" />
              </button>
            </div>
          </form>
          {weatherData && (
            <div className="p-[1em] mt-[2em] 821px:w-[30em]  w-auto flex flex-col justify-center items-center text-white">
              <p className="text-[1.3em]">
                {selectedCity.charAt(0).toUpperCase() +
                  selectedCity.slice(1) +
                  ", " +
                  `${weatherData.sys.country}`}
              </p>
              <div className="bg-[#ffffff7a] h-[0.1em] w-full m-1" />
              <div className="w-full flex justify-between items-center p-[0.7em]">
                <p>Temperature</p> <p> {weatherData.main.temp}°C</p>
              </div>
              <div className="bg-[#ffffff7a] h-[0.1em] w-full m-1" />
              <div className="w-full flex justify-between items-center p-[0.7em]">
                <p>Humidity</p> <p> {weatherData.main.humidity}%</p>
              </div>
              <div className="bg-[#ffffff7a] h-[0.1em] w-full m-1" />
              <div className="w-full flex justify-between items-center p-[0.7em]">
                <p>Visibility: </p>
                <p>{`${weatherData.visibility}` / 1000 + " Km"} </p>
              </div>
              <div className="bg-[#ffffff7a] h-[0.1em] w-full m-1" />
              <div className="w-full flex justify-between items-center p-[0.7em]">
                <p>Wind Speed:</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex flex-col justify-center items-center">
            <Lottie
              options={defaultOptions}
              height={200}
              width={200}
              color="white"
            />{" "}
            <p className="text-[#ff0000]">Error: City not found</p>
          </div>
        )}
      </div>
      {loading && <p className="text-white">Loading...</p>}
    </div>
  );
};

export default WeatherDisplay;
