import { useState, type Dispatch, type SetStateAction } from "react";
import WeatherIcon from "../../../../shared/components/WeatherIcon/WeatherIcon";
import type { Units } from "../../../settings/types/units.types";
import type { Weather } from "../../types/weather.types";
import DaySelector from "../DaySelector/DaySelector";
import "./HourlyForecast.css";
import { transformHourlyData } from "../../utils/formatWeather";
import { UNIT_SYMBOLS } from "../../../settings/utils/unitSymbols";

type HourlyWeather = {
  time: string;
  temp: number;
  weathercode: number;
};

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type WeeklyWeather = Record<Day, HourlyWeather[]>;

interface HourlyForecastProps {
  weather: Weather;
  units: Units;
}

const HourlyForecast = ({ weather, units }: HourlyForecastProps) => {
  const { hourly, current } = weather;
  const date = new Date(current.time);
  const currentHour = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });

  const hourlyData = transformHourlyData(hourly) as WeeklyWeather;
  const [selectedDay, setSelectedDay] = useState<Day | null>(() => {
    const forecastDays = Object.keys(hourlyData).map((item) => ({
      label: item,
      value: item,
    }));

    return forecastDays[0].value as Day;
  });
  let hourlyForecast = null;

  if (selectedDay) {
    const currentHourIndex = hourlyData[selectedDay].findIndex(
      (item) => item.time === currentHour,
    );

    hourlyForecast = hourlyData[selectedDay].slice(
      currentHourIndex + 1,
      currentHourIndex + 9,
    );
  }

  return (
    <section
      className="hourly-forecast"
      aria-labelledby="hourly-forecast-title"
    >
      <div className="hourly-forecast__header">
        <h2 className="hourly-forecast__title">Hourly forecast</h2>

        <div className="hourly-forecast__day-selector">
          <DaySelector
            houlyForecast={hourly}
            onSelectDay={setSelectedDay}
            selectedDay={selectedDay}
          />
        </div>
      </div>

      <ul className="hourly-forecast__list">
        {hourlyForecast?.map((item) => (
          <li key={item.time} className="hourly-forecast__item">
            <article className="hourly-forecast__card">
              <div className="hourly-forecast__condition">
                <WeatherIcon
                  code={item.weathercode}
                  className="hourly-forecast__icon"
                />

                <h3 className="hourly-forecast__time">{item.time}</h3>
              </div>

              <p className="hourly-forecast__temperature">
                {item.temp}
                {UNIT_SYMBOLS.temperature[units.temperature]}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HourlyForecast;
