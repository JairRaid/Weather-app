import type { GeocodingApiResult } from "../schemas/geocoding-api.schema";
import type { Location } from "../types/location.types";

export const mapGeocodingResult = (result: GeocodingApiResult): Location => {
  return {
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    countryCode: result.country_code,
    timezone: result.timezone,
  };
};
