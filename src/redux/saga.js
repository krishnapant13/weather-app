import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "./actions";

function* fetchWeatherData(action) {
  try {
    const apiKey = "a6e8211cd6e0ab00c42a1d2421ce0951";
    const response = yield call(() =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&appid=${apiKey}`
      )
    );
    const weatherData = response.data;
    yield put({ type: FETCH_WEATHER_SUCCESS, payload: weatherData });
  } catch (error) {
    yield put({ type: FETCH_WEATHER_FAILURE, error });
  }
}


export default function* rootSaga() {
  yield takeLatest(FETCH_WEATHER_REQUEST, fetchWeatherData);

}
