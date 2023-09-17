import { useGlobalDataProvider } from "@/Hooks";

const useHeaderComponent = () => {
  const { selecteItems, setSelecteItems } = useGlobalDataProvider();

  const onCloseClickHandler = () => {
    console.log("close handler");
    setSelecteItems([]);
  };

  const onDeleteClickHandler = () => {
    console.log("This is delete click handler");
  };

  const onAddToAlbumClickHandler = () => {
    console.log("This is add to albums click handler");
  };

  const onDownloadClickHandler = () => {
    console.log("This is download click handler");
  };

  return {
    onCloseClickHandler,
    onDeleteClickHandler,
    onAddToAlbumClickHandler,
    onDownloadClickHandler,
    selecteItems,
  };
};

export default useHeaderComponent;
