import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import type { HourlyForecast } from "../../types/weather.types";
import { transformHourlyData } from "../../utils/formatWeather";
import "./DaySelector.css";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface DaySelectorProps {
  houlyForecast: HourlyForecast;
  onSelectDay: Dispatch<SetStateAction<Day | null>>;
  selectedDay: Day | null;
}

const DaySelector = ({
  houlyForecast,
  onSelectDay,
  selectedDay,
}: DaySelectorProps) => {
  const hourlyData = transformHourlyData(houlyForecast);
  const forecastDays = Object.keys(hourlyData).map((item) => ({
    label: item,
    value: item,
  }));

  const handleSelectDay = (value: string | null) => {
    onSelectDay(value as Day | null);
  };

  return (
    <Select
      items={forecastDays}
      value={selectedDay}
      onValueChange={handleSelectDay}
    >
      <SelectTrigger className="day-selector__trigger">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        align="start"
        alignItemWithTrigger={false}
        className="day-selector__content"
      >
        <SelectGroup>
          {forecastDays.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="day-selector__item data-[state=checked]:bg-neutral-700"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DaySelector;
