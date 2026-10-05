import { Fragment } from "react";
import unitIcon from "/images/icon-units.svg";
import dropdownIcon from "/images/icon-dropdown.svg";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import "./DropdownUnits.css";
import type {
  PrecipitationUnit,
  TemperatureUnit,
  Units,
  WindSpeedUnit,
} from "../../../features/settings/types/units.types";

type UnitGroup = {
  key: keyof Units;
  menuLabel: string;
  items: { label: string; value: string }[];
};

const unitGroups: UnitGroup[] = [
  {
    key: "temperature",
    menuLabel: "Temperature",
    items: [
      {
        label: "Celsius (°C)",
        value: "celsius",
      },
      {
        label: "Fahrenheit (°F)",
        value: "fahrenheit",
      },
    ],
  },
  {
    key: "windSpeed",
    menuLabel: "Wind Speed",
    items: [
      {
        label: "km/h",
        value: "kmh",
      },
      {
        label: "mph",
        value: "mph",
      },
    ],
  },
  {
    key: "precipitation",
    menuLabel: "Precipitation",
    items: [
      {
        label: "Millimeters (mm)",
        value: "mm",
      },
      {
        label: "Inches (in)",
        value: "inch",
      },
    ],
  },
];

const METRIC_UNITS: Units = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};

const IMPERIAL_UNITS: Units = {
  temperature: "fahrenheit",
  windSpeed: "mph",
  precipitation: "inch",
};

interface DropdownUnitsProps {
  units: Units;
  onChangeUnits: React.Dispatch<React.SetStateAction<Units>>;
}

const DropdownUnits = ({ units, onChangeUnits }: DropdownUnitsProps) => {
  const isImperial =
    units.temperature === "fahrenheit" &&
    units.windSpeed === "mph" &&
    units.precipitation === "inch";

  const handleChangeUnits = (
    unitKey: keyof Units,
    value: TemperatureUnit | WindSpeedUnit | PrecipitationUnit,
  ) => {
    onChangeUnits((prev) => ({ ...prev, [unitKey]: value }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="dropdown-units__trigger"
        render={
          <Button>
            <img
              src={unitIcon}
              className="dropdown-units__icon dropdown-units__icon--units border-none"
              alt=""
            />
            <span className="dropdown-units__trigger-label">Units</span>
            <img
              src={dropdownIcon}
              className="dropdown-units__icon dropdown-units__icon--chevron border-none"
              alt=""
            />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="dropdown-units__content ">
        <DropdownMenuItem
          className="dropdown-units__switch"
          onClick={() =>
            onChangeUnits(isImperial ? METRIC_UNITS : IMPERIAL_UNITS)
          }
        >
          Switch to {isImperial ? "Metric" : "Imperial"}
        </DropdownMenuItem>
        {unitGroups.map((unitRadio) => (
          <Fragment key={unitRadio.menuLabel}>
            <DropdownMenuGroup className="dropdown-units__group">
              <DropdownMenuLabel className="dropdown-units__label">
                {unitRadio.menuLabel}
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                className="dropdown-units__radio-group"
                value={units[unitRadio.key]}
                onValueChange={(value) =>
                  handleChangeUnits(unitRadio.key, value)
                }
              >
                {unitRadio.items.map((item) => (
                  <DropdownMenuRadioItem
                    key={item.value}
                    value={item.value}
                    className="dropdown-units__radio-item data-checked:bg-neutral-700" // data-checked means the item is checked
                  >
                    {item.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            {unitRadio.menuLabel !== "Precipitation" && (
              <DropdownMenuSeparator className="bg-neutral-600 mx-8" />
            )}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUnits;
