import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./SearchForm.css";
import {
  locationSearchSchema,
  type locationSearchFormValues,
} from "../../schemas/location-search.schema";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import LocationSuggestions from "../LocationSuggestions/LocationSuggestions";
import type { Location } from "../../types/location.types";
import { useState } from "react";

interface SearchFormProps {
  onLocationSelect: (location: Location) => void;
}

const SearchForm = ({ onLocationSelect }: SearchFormProps) => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const { control, register, setValue } = useForm<locationSearchFormValues>({
    resolver: zodResolver(locationSearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const search = useWatch({
    control,
    name: "search",
  });

  const {
    data: locations = [],
    isPending,
    isLoading,
    isError,
    isSuccess,
  } = useLocationSearch(search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsSuggestionsOpen(value.trim().length >= 2);
  };

  const handleLocationSelect = (location: Location) => {
    setValue("search", `${location.name}, ${location.country}`);
    setIsSuggestionsOpen(false);

    onLocationSelect(location);
  };

  return (
    <section className="weather-search" aria-labelledby="weather-search-title">
      <h1 id="weather-search-title" className="weather-search__title">
        How's the sky looking today?
      </h1>

      <form className="weather-search__form" role="search">
        <div className="weather-search__field">
          <label htmlFor="weather-city" className="sr-only">
            Search for a city
          </label>
          <img src="/images/icon-search.svg" alt="" />

          <input
            id="weather-city"
            className="weather-search__input"
            type="search"
            placeholder="Search for a place..."
            autoComplete="off"
            {...register("search", { onChange: handleSearchChange })}
          />

          {!isPending && isSuggestionsOpen && (
            <LocationSuggestions
              locations={locations}
              onSelect={handleLocationSelect}
            />
          )}
          {isLoading && !isError && (
            <p className="weather-search__loading">
              <img
                src="images/icon-loading.svg"
                alt=""
                className="animate-spin"
              />{" "}
              Search in progress
            </p>
          )}
        </div>

        <button
          className="weather-search__submit button button--primary"
          type="submit"
        >
          Search
        </button>
      </form>

      {isSuccess && !locations.length && (
        <p className="weather-app__no-results">No search result found!</p>
      )}
    </section>
  );
};

export default SearchForm;
