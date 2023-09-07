import React, { createContext, useState } from "react";
import { GlobalDataProviderProps, GlobalDataProviderType } from "./types";
import { SIDEBAR_CONFIG } from "@/constants/sidebarConfig";

export const globalContext = createContext<GlobalDataProviderType | undefined>(
  undefined
);

const GlobalDataProvider: React.FC<GlobalDataProviderProps> = ({
  children,
}) => {
  const [sidebarConfig, setsidebarConfig] = useState(SIDEBAR_CONFIG);

  return (
    <globalContext.Provider value={{ sidebarConfig, setsidebarConfig }}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalDataProvider;
