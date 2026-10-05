import z from "zod";

export const geocodingApiResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string(),
  country_code: z.string(),
  timezone: z.string(),
});

export const geocodingApiResponseSchema = z.object({
  results: z.array(geocodingApiResultSchema).optional(),
});

export type GeocodingApiResult = z.infer<typeof geocodingApiResultSchema>;

export type GeocodingApiResponse = z.infer<typeof geocodingApiResponseSchema>;
