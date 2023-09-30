import { useGlobalDataProvider } from "@/Hooks";
import { isAddToAlbumOpen } from "@/recoil/uploadModalState";
import { useRecoilState } from "recoil";

const useHeaderComponent = () => {
  const { selecteItems, setSelecteItems, addToAlbumOpen, setAddToAlbumOpen } =
    useGlobalDataProvider();
  // const [addToAlbumOpen, setAddToAlbumOpen] = useRecoilState(isAddToAlbumOpen);

  const onCloseClickHandler = () => {
    console.log("close handler");
    setSelecteItems([]);
  };

  const onDeleteClickHandler = () => {
    console.log("This is delete click handler");
  };

  const onAddToAlbumClickHandler = () => {
    setAddToAlbumOpen(true);
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
    addToAlbumOpen,
    setAddToAlbumOpen,
  };
};

export default useHeaderComponent;
