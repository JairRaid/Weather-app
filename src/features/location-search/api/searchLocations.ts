import { mapGeocodingResult } from "../mappers/mapGeocodingResult";
import { fetchCities } from "./geocodingApi";

export const searchLocations = async (name: string) => {
  const data = await fetchCities({ name, count: 5 });

  return data.results?.map(mapGeocodingResult) ?? [];
};
