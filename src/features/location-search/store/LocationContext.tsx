import { useState, type ReactNode } from "react";
import { LocationContext, type Position } from "./location-context";

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [position, setPosition] = useState<Position | null>(null);
  const value = { position, setPosition };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
