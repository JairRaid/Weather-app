import type { Location } from "../../types/location.types";
import "./LocationSuggestions.css";

interface LocationSuggestionsProps {
  locations: Location[];
  onSelect: (location: Location) => void;
}

const LocationSuggestions = ({
  locations,
  onSelect,
}: LocationSuggestionsProps) => {
  if (locations.length === 0) return null;

  return (
    <ul className={`city-list ${locations.length === 0 ? "hidden" : ""}`}>
      {locations.map((location) => (
        <li key={`${location.id}`} className="city-item">
          <button
            type="button"
            className="text-start w-full"
            onClick={() => onSelect(location)}
          >
            {location.name}, {location.country}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LocationSuggestions;
