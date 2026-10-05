export const weaherQueryKeys = {
  all: ["wheather"] as const,

  current: (
    latitude: number,
    longitude: number,
    temperatureUnit: string,
    windSpeedUnit: string,
    precipitationUnit: string,
  ) =>
    [
      "weather",
      "current",
      latitude,
      longitude,
      temperatureUnit,
      windSpeedUnit,
      precipitationUnit,
    ] as const,
};
