import type {
  PrecipitationUnit,
  TemperatureUnit,
  WindSpeedUnit,
} from "../types/units.types";

export const UNIT_SYMBOLS = {
  temperature: {
    celsius: "°C",
    fahrenheit: "°F",
  },
  windSpeed: {
    kmh: "km/h",
    mph: "mph",
  },
  precipitation: {
    mm: "mm",
    inch: "in",
  },
} satisfies {
  temperature: Record<TemperatureUnit, string>;
  windSpeed: Record<WindSpeedUnit, string>;
  precipitation: Record<PrecipitationUnit, string>;
};
