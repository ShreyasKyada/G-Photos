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
  const [selecteItems, setSelecteItems] = useState([]);
  const [addToAlbumOpen, setAddToAlbumOpen] = useState();

  return (
    <globalContext.Provider
      value={{
        sidebarConfig,
        setsidebarConfig,
        selecteItems,
        setSelecteItems,
        addToAlbumOpen,
        setAddToAlbumOpen,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalDataProvider;
