import { globalContext } from "@/context/GlobalDataProvider";
import { useContext } from "react";

const useGlobalDataProvider = () => {
  const data: any = useContext<any>(globalContext);

  return data;
};

export default useGlobalDataProvider;
