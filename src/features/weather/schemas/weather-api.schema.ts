import z, { string } from "zod";

export const weatherApiCurrentSchema = z.object({
  temperature_2m: z.number(),
  apparent_temperature: z.number(),
  relative_humidity_2m: z.number(),
  wind_speed_10m: z.number(),
  precipitation: z.number(),
  weather_code: z.number(),
  is_day: z.number(),
  time: z.string(),
});

export const weatherApiDailySchema = z.object({
  time: z.array(z.string()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  weathercode: z.array(z.number()),
});

export const weatherApiHourlySchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  weathercode: z.array(z.number()),
});

export const weatherApiResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  current: weatherApiCurrentSchema,
  daily: weatherApiDailySchema,
  hourly: weatherApiHourlySchema,
});

export type weatherApiCurrent = z.infer<typeof weatherApiCurrentSchema>;

export type weatherApiDaily = z.infer<typeof weatherApiDailySchema>;

export type weatherApiHourly = z.infer<typeof weatherApiHourlySchema>;

export type weatherApiResponse = z.infer<typeof weatherApiResponseSchema>;
