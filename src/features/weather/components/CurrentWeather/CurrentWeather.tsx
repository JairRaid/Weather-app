import WeatherIcon from "../../../../shared/components/WeatherIcon/WeatherIcon";
import type { Units } from "../../../settings/types/units.types";
import { UNIT_SYMBOLS } from "../../../settings/utils/unitSymbols";
import type { Weather } from "../../types/weather.types";
import { formatWeatherDate } from "../../utils/formatWeather";
import "./CurrentWeather.css";

export type CurrentWeatherProps = {
  weather: Weather;
  units: Units;
};

const CurrentWeather = ({ weather, units }: CurrentWeatherProps) => {
  const { location, current } = weather;
  const { temperature, time, weatherCode } = current;

  return (
    <section
      className="current-weather"
      aria-label={`Current weather in ${location.name}, ${location.country}`}
    >
      <div className="current-weather__background" aria-hidden="true">
        <div className="current-weather__location">
          <h2 className="current-weather__city">
            {location.name}, {location.country}
          </h2>

          <p className="current-weather__date">{formatWeatherDate(time)}</p>
        </div>

        <div className="current-weather__temperature">
          <WeatherIcon className="current-weather__icon" code={weatherCode} />

          <p className="current-weather__value">
            <span className="sr-only">Current temperature: </span>
            {temperature}
            {UNIT_SYMBOLS.temperature[units.temperature]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
