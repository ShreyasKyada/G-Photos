import Link from "next/link";

export const SIDEBAR_CONFIG = [
  {
    key: "allPhotos",
    label: <Link href={"/dashboard"}>All Photos</Link>,
  },
  {
    key: "albums",
    label: <Link href={"/albums"}>Albums</Link>,
  },
];
