import React, { createContext, useState } from "react";

const useFiltersState = (initialFilters) =>
  useState(initialFilters);

export const FitlersContext = createContext({});

export const useFilters
 = () => {
  const filters = React.useContext(FitlersContext);
  if (!filters) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return filters;
};

const FiltersProvider = ({
  filters: initialFilters = {},
  children,
}) => {
  const [filters, setFilters] = useFiltersState(initialFilters);

  return (
    <FitlersContext.Provider value={[filters, setFilters]}>
      {children}
    </FitlersContext.Provider>
  );
};

export default FiltersProvider;
