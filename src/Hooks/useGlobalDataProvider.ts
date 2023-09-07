import { globalContext } from "@/context/GlobalDataProvider";
import { GlobalDataProviderType } from "@/context/GlobalDataProvider/types";
import { useContext } from "react";

const useGlobalDataProvider = () => {
  const data: any = useContext<GlobalDataProviderType | undefined>(
    globalContext
  );

  return data;
};

export default useGlobalDataProvider;
