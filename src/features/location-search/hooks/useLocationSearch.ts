import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "../api/searchLocations";
import { useDebounce } from "../../../hooks/useDebounce";

export const useLocationSearch = (search: string) => {
  const normalizedSearch = search.trim();

  const debounceSearch = useDebounce(normalizedSearch, 500);

  return useQuery({
    queryKey: ["locations", normalizedSearch],
    queryFn: () => searchLocations(normalizedSearch),
    enabled: debounceSearch.length >= 2,
  });
};
