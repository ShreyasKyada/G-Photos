import { atom } from "recoil";

export const isUpadateModalOpen = atom({
  key: "isUpadateModalOpen",
  default: false,
});

export const isAddToAlbumOpen = atom({
  key: "isAddToAlbumOpen",
  default: false,
});

// export const isAddToAlbumOpen = atom({
//   key: "isAddToAlbumOpen",
//   default: false,
// });

export const uploadedFilesCountAtom = atom({
  key: "uploadedFilesCountAtom",
  default: 0,
});

export const createdBatchCountAtom = atom({
  key: "createdBatchCountAtom",
  default: 0,
});
