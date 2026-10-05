import type { DailyForecast, HourlyForecast } from "../types/weather.types";

export const formatWeatherDate = (dateString: string) => {
  if (!dateString) return;
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const formatWeatherForecastTime = (
  dateStrings: string[],
  timezone: string,
) => {
  if (!dateStrings.length) return;

  const formattedDateStrings = dateStrings.map((date) => {
    const d = new Date(date);

    const shortDay = d.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: timezone,
    });

    return shortDay;
  });

  return formattedDateStrings;
};

export const formatWeatherDailyForecast = (dailyData: DailyForecast) => {
  const daily = dailyData;

  const formattedDaily = daily.dayOfTheWeek.map((day, index) => ({
    day,
    tempMax: Math.round(daily.temperatureMax[index]),
    tempMin: Math.trunc(daily.temperatureMin[index]),
    weathercode: daily.weathercode[index],
  }));

  return formattedDaily;
};

export const transformHourlyData = (hourly: HourlyForecast) => {
  return hourly.time.reduce((acc, isoTime, index) => {
    const date = new Date(isoTime);

    // Extract weekday name (e.g., "Tuesday", "Friday")
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    // Format hour into "3 PM", "4 PM", "12 AM", etc.
    const hourFormatted = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const item = {
      time: hourFormatted,
      temp: Math.round(hourly.temperature_2m[index]),
      weathercode: hourly.weathercode[index],
    };

    if (!acc[dayName]) {
      acc[dayName] = [];
    }

    acc[dayName].push(item);
    return acc;
  }, {});
};
