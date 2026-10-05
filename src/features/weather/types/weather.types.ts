import type { Location } from "../../location-search/types/location.types";

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

export interface DailyForecast {
  dayOfTheWeek: string[];
  temperatureMax: number[];
  temperatureMin: number[];
  weathercode: number[];
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

export interface Weather {
  location: Location;
  current: CurrentWeather;
  daily: DailyForecast;
  hourly: HourlyForecast;
}
