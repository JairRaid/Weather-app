import WeatherIcon from "../../../../shared/components/WeatherIcon/WeatherIcon";
import type { Units } from "../../../settings/types/units.types";
import { UNIT_SYMBOLS } from "../../../settings/utils/unitSymbols";
import type { Weather } from "../../types/weather.types";
import { formatWeatherDailyForecast } from "../../utils/formatWeather";
import "./DailyForecast.css";

interface DailyForcastProps {
  weather: Weather;
  units: Units;
}

const DailyForcast = ({ weather, units }: DailyForcastProps) => {
  const { daily } = weather;
  const formattedDaily = formatWeatherDailyForecast(daily);

  return (
    <section className="daily-forecast" aria-labelledby="daily-forecast-title">
      <h2 id="daily-forecast-title" className="daily-forecast__title">
        Daily forecast
      </h2>

      <ul className="daily-forecast__list">
        {formattedDaily &&
          formattedDaily.map((forecast) => (
            <li key={forecast.day} className="daily-forecast__item">
              <article className="daily-forecast__card">
                <h3 className="daily-forecast__day">{forecast.day}</h3>

                <WeatherIcon
                  code={forecast.weathercode}
                  className="daily-forecast__icon"
                />

                <div className="daily-forecast__temperatures">
                  <span className="daily-forecast__high">
                    {forecast.tempMax}
                    {UNIT_SYMBOLS.temperature[units.temperature]}
                  </span>

                  <span className="daily-forecast__low">
                    {forecast.tempMin}
                    {UNIT_SYMBOLS.temperature[units.temperature]}
                  </span>
                </div>
              </article>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default DailyForcast;
