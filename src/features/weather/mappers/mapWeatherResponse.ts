import type { Location } from "../../location-search/types/location.types";
import type { weatherApiResponse } from "../schemas/weather-api.schema";
import type { Weather } from "../types/weather.types";
import { formatWeatherForecastTime } from "../utils/formatWeather";

export const mapWeatherResponse = (
  data: weatherApiResponse,
  location: Location,
): Weather => {
  return {
    location,

    current: {
      temperature: Math.round(data.current.temperature_2m),
      apparentTemperature: Math.round(data.current.apparent_temperature),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      precipitation: Math.round(data.current.precipitation),
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
      time: data.current.time,
    },

    daily: {
      dayOfTheWeek:
        formatWeatherForecastTime(data.daily.time, data.timezone) ?? [],
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
      weathercode: data.daily.weathercode,
    },

    hourly: {
      time: data.hourly.time,
      temperature_2m: data.hourly.temperature_2m,
      weathercode: data.hourly.weathercode,
    },
  };
};
