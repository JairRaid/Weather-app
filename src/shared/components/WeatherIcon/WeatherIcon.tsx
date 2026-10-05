import "./WeatherIcon.css";

import sunny from "@/assets/icon-sunny.webp";
import partlyCloudy from "@/assets/icon-partly-cloudy.webp";
import overcast from "@/assets/icon-overcast.webp";
import fog from "@/assets/icon-fog.webp";
import rain from "@/assets/icon-rain.webp";
import snow from "@/assets/icon-snow.webp";
import storm from "@/assets/icon-storm.webp";

type WeatherIconInfo = {
  label: string;
  icon: string;
};

type WeatherIconMap = Record<number, WeatherIconInfo>;

const WEATHER_ICONS: WeatherIconMap = {
  0: { label: "Clear sky", icon: sunny },
  1: { label: "Mainly clear", icon: partlyCloudy },
  2: { label: "Partly cloudy", icon: partlyCloudy },
  3: { label: "Overcast", icon: overcast },
  45: { label: "Fog", icon: fog },
  48: { label: "Depositing rime fog", icon: fog },
  51: { label: "Drizzle", icon: rain },
  61: { label: "Slight rain", icon: rain },
  63: { label: "Moderate rain", icon: rain },
  65: { label: "Heavy rain", icon: rain },
  71: { label: "Slight snow", icon: snow },
  73: { label: "Moderate snow", icon: snow },
  75: { label: "Heavy snow", icon: snow },
  95: { label: "Thunderstorm", icon: storm },
  96: { label: "Thunderstorm with hail", icon: storm },
};

interface WeatherIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  code: number;
}

const WeatherIcon = ({ code, className }: WeatherIconProps) => {
  const weatherIcon = WEATHER_ICONS[code] || {
    label: "unknown",
    icon: overcast,
  };
  return <img src={weatherIcon.icon} alt="" className={className} />;
};

export default WeatherIcon;
