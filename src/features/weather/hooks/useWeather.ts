import { useQuery } from "@tanstack/react-query";
import type { Location } from "../../location-search/types/location.types";
import type { Units } from "../../settings/types/units.types";
import { weaherQueryKeys } from "../api/weatherQueryKeys";
import { getWeather } from "../api/getWeather";

interface useWeatherParams {
  location: Location | null;
  units: Units;
}

export const useWeather = ({ location, units }: useWeatherParams) => {
  return useQuery({
    queryKey: weaherQueryKeys.current(
      location?.latitude ?? 0,
      location?.longitude ?? 0,
      units.temperature,
      units.windSpeed,
      units.precipitation,
    ),

    queryFn: () => {
      if (!location) {
        throw new Error("Cannot fethc weather without a location.");
      }
      return getWeather({ location: location, units });
    },

    enabled: location !== null,
  });
};
