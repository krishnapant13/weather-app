import {
  SET_SELECTED_CITY,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "./actions";

const initialState = {
  selectedCity: "",
  weatherData: null,
  loading: false,
  error: null,
};
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(0);

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    case FETCH_WEATHER_SUCCESS:
      const weatherData = action.payload;
      const temperatureInCelsius = kelvinToCelsius(weatherData.main.temp);
      return {
        ...state,
        weatherData: {
          ...weatherData,
          main: {
            ...weatherData.main,
            temp: temperatureInCelsius,
          },
        },
        loading: false,
        error: null,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        weatherData: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default rootReducer;
