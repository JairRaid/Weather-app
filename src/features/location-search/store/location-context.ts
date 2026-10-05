import { createContext, type Dispatch, type SetStateAction } from "react";

export type Position = {
  latitude: number;
  longitude: number;
};

type LocationContextValue = {
  position: Position | null;
  setPosition: Dispatch<SetStateAction<Position | null>>;
};

export const LocationContext = createContext<LocationContextValue | null>(null);
