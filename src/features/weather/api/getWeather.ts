import type { Location } from "../../location-search/types/location.types";
import type { Units } from "../../settings/types/units.types";
import { mapWeatherResponse } from "../mappers/mapWeatherResponse";
import { fetchWeather } from "./weatherApi";

interface GetWeatherParams {
  location: Location;
  units: Units;
}

export const getWeather = async ({ location, units }: GetWeatherParams) => {
  const data = await fetchWeather({
    latitude: location.latitude,
    longitude: location.longitude,
    temperatureUnit: units.temperature,
    windSpeedUnit: units.windSpeed,
    precipitationUnit: units.precipitation,
  });

  return mapWeatherResponse(data, location);
};
