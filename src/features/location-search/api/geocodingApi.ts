import { apiClient } from "../../../api/apiClient";
import { geocodingApiResponseSchema } from "../schemas/geocoding-api.schema";

interface FetchCitiesParams {
  name: string;
  count?: number;
}

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const fetchCities = async ({ name, count = 5 }: FetchCitiesParams) => {
  const params = new URLSearchParams({
    name: name,
    count: String(count),
    language: "en",
    format: "json",
  });

  const json: unknown = await apiClient.request(
    `${GEOCODING_API_URL}?${params.toString()}`,
  );

  return geocodingApiResponseSchema.parse(json);
};
