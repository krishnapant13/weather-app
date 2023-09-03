export const SET_SELECTED_CITY = "SET_SELECTED_CITY";
export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export const setSelectedCity = (city) => ({
  type: SET_SELECTED_CITY,
  payload: city,
});

export const fetchWeatherRequest = (city) => ({
  type: FETCH_WEATHER_REQUEST,
  payload: city,
});
