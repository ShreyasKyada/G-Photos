import Link from "next/link";

export const SIDEBAR_CONFIG = [
  {
    key: "allPhotos",
    label: <Link href="/">All Photos</Link>,
  },
  {
    key: "albums",
    label: <Link href="/albums">Albums</Link>,
  },
  {
    key: "App Created Data",
    label: <Link href="/albums_shreyas">albums_shreyas</Link>,
  },
];
