import type { Units } from "../../../settings/types/units.types";
import { UNIT_SYMBOLS } from "../../../settings/utils/unitSymbols";
import type { Weather } from "../../types/weather.types";
import WeatherDetailsCard from "../WeatherDetailsCard/WeatherDetailsCard";
import "./WeatherDetails.css";

export type WeatherDetailProps = {
  weather: Weather;
  units: Units;
};

const WeatherDetails = ({ weather, units }: WeatherDetailProps) => {
  const { current } = weather;
  const { apparentTemperature, humidity, windSpeed, precipitation } = current;

  return (
    <section className="weather-details" aria-label="Weather conditions">
      <WeatherDetailsCard
        label={"Feels Like"}
        value={apparentTemperature}
        unit={UNIT_SYMBOLS.temperature[units.temperature]}
      />
      <WeatherDetailsCard label={"Humidity"} value={humidity} unit="%" />
      <WeatherDetailsCard
        label={"Wind"}
        value={windSpeed}
        unit={` ${UNIT_SYMBOLS.windSpeed[units.windSpeed]}`}
      />
      <WeatherDetailsCard
        label={"Precipitation"}
        value={precipitation}
        unit={` ${UNIT_SYMBOLS.precipitation[units.precipitation]}`}
      />
    </section>
  );
};

export default WeatherDetails;
