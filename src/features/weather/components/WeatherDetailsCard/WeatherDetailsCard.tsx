import "./WeatherDetailsCard.css";

type WeatherDetailsCardProps = {
  label: string;
  value: number;
  unit: string;
};

const WeatherDetailsCard = ({
  label,
  value,
  unit,
}: WeatherDetailsCardProps) => {
  return (
    <article className="weather-details__card">
      <h3 className="weather-details__label">{label}</h3>

      <p className="weather-details__value">
        <span className="sr-only">{label}: </span>
        {value}
        <span className="weather-details__unit">{unit}</span>
      </p>
    </article>
  );
};

export default WeatherDetailsCard;
