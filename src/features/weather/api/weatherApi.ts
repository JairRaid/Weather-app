import { apiClient } from "../../../api/apiClient";
import type {
  PrecipitationUnit,
  TemperatureUnit,
  WindSpeedUnit,
} from "../../settings/types/units.types";
import { weatherApiResponseSchema } from "../schemas/weather-api.schema";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

interface FetchWeatherParams {
  latitude: number;
  longitude: number;
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  precipitationUnit: PrecipitationUnit;
}

export const fetchWeather = async ({
  latitude,
  longitude,
  temperatureUnit,
  windSpeedUnit,
  precipitationUnit,
}: FetchWeatherParams) => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "weather_code",
      "is_day",
    ].join(","),
    daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"].join(
      ",",
    ),
    hourly: ["temperature_2m", "weathercode"].join(","),
    temperature_unit: temperatureUnit,
    wind_speed_unit: windSpeedUnit,
    precipitation_unit: precipitationUnit,

    timezone: "auto",
  });

  const json: unknown = await apiClient.request(
    `${WEATHER_API_URL}?${params.toString()}`,
  );

  return weatherApiResponseSchema.parse(json);
};
