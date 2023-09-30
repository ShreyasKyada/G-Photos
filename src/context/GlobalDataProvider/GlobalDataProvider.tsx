import React, { createContext, useState } from "react";
import { GlobalDataProviderProps } from "./types";
import { SIDEBAR_CONFIG } from "@/constants/sidebarConfig";

export const globalContext = createContext<any>(undefined);

const GlobalDataProvider: React.FC<GlobalDataProviderProps> = ({
  children,
}) => {
  const [sidebarConfig, setsidebarConfig] = useState(SIDEBAR_CONFIG);
  const [selecteItems, setSelecteItems] = useState([]);
  const [addToAlbumOpen, setAddToAlbumOpen] = useState();
  const [isUpadateModalOpen, setIsUpadateModalOpen] = useState(false);

  return (
    <globalContext.Provider
      value={{
        sidebarConfig,
        setsidebarConfig,
        selecteItems,
        setSelecteItems,
        addToAlbumOpen,
        setAddToAlbumOpen,
        isUpadateModalOpen,
        setIsUpadateModalOpen,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalDataProvider;
