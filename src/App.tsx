import { useState } from "react";
import Header from "./components/layout/Header/Header";
import SearchForm from "./features/location-search/components/SearchForm/SearchForm";
import CurrentWeather from "./features/weather/components/CurrentWeather/CurrentWeather";
import WeatherDetails from "./features/weather/components/WeatherDetails/WeatherDetails";
import type { Location } from "./features/location-search/types/location.types";
import { useWeather } from "./features/weather/hooks/useWeather";
import type { Units } from "./features/settings/types/units.types";
import DailyForcast from "./features/weather/components/DailyForecast/DailyForecast";
import HourlyForecast from "./features/weather/components/HourlyForecast/HourlyForecast";
import "@/app/App.css";

const DEFAULT_UNITS: Units = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [units, setUnits] = useState<Units>(DEFAULT_UNITS);

  const { data, isLoading, isSuccess } = useWeather({
    location: selectedLocation,
    units,
  });

  return (
    <div className="weather-app__container ">
      <Header units={units} onChangeUnits={setUnits} />

      <main className="weather-app__main">
        <SearchForm onLocationSelect={setSelectedLocation} />

        {isSuccess && data && (
          <div className="weather-dashboard">
            <div className="weather-dashboard__main">
              <CurrentWeather weather={data} units={units} />
              <WeatherDetails weather={data} units={units} />
              <DailyForcast weather={data} units={units} />
            </div>

            <HourlyForecast weather={data} units={units} />
          </div>
        )}

        {isLoading && (
          <div
            className="weather-dashboard skeleton-dashboard"
            aria-busy="true"
            aria-label="Loading weather forecast"
          >
            <div className="weather-dashboard__main">
              <section
                className="skeleton-current"
                aria-label="Loading current weather"
              >
                <div className="skeleton-current__loader" aria-hidden="true">
                  <span className="skeleton-current__dot" />
                  <span className="skeleton-current__dot" />
                  <span className="skeleton-current__dot" />
                  <span className="skeleton-current__text">Loading...</span>
                </div>
              </section>

              <section
                className="skeleton-details"
                aria-label="Loading weather details"
              >
                {["Feels Like", "Humidity", "Wind", "Precipitation"].map(
                  (label) => (
                    <div className="skeleton-details__card" key={label}>
                      <span className="skeleton-details__label">{label}</span>
                      <span className="skeleton-details__value">—</span>
                    </div>
                  ),
                )}
              </section>

              <section
                className="skeleton-daily"
                aria-label="Loading daily forecast"
              >
                <h2 className="skeleton-daily__title">Daily forecast</h2>
                <div className="skeleton-daily__list" aria-hidden="true">
                  {Array.from({ length: 7 }, (_, index) => (
                    <div className="skeleton-daily__card" key={index} />
                  ))}
                </div>
              </section>
            </div>

            <section
              className="skeleton-hourly"
              aria-label="Loading hourly forecast"
            >
              <div className="skeleton-hourly__header">
                <h2 className="skeleton-hourly__title">Hourly forecast</h2>
                <div className="skeleton-hourly__selector" aria-hidden="true">
                  <span />
                  <span />
                </div>
              </div>
              <div className="skeleton-hourly__list" aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => (
                  <div className="skeleton-hourly__card" key={index} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
