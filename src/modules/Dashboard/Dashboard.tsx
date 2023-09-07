// "use client";
// import React, { useEffect } from "react";
// import { signOut, useSession } from "next-auth/react";
// import withAuth from "@/utils/withAuth";
// import { useQuery } from "react-query";
// import { Image } from "antd";
// import getAlbums from "@/services/getAlbums";
// import { getAccessToken } from "@/services/getAccessToken";

// const Dashboard = () => {
//   const { data }: any = useSession();

//   // const { data: albumsData } = useQuery({
//   //   queryKey: ["album"],
//   //   queryFn: () => getAlbums(data.accessToken),
//   //   enabled: !!data,
//   //   select: (data) => data.data.albums,
//   //   refetchOnMount: false,
//   //   refetchOnWindowFocus: false,
//   // });

//   console.log("data", data);

//   return (
//     <div>
//       <button onClick={() => signOut()}>Log out</button>
{
  /* {albumsData?.length > 0 &&
        albumsData.map((data: any, index: number) => {
          return (
            <Image
              preview={false}
              key={index}
              alt=""
              src={data.coverPhotoBaseUrl}
            />
          );
        })} */
}
//       {/* <button onClick={() => signIn("google")}>Login with Google</button> */}
//       {/* <a
//         href={`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`}
//       >
//         Log out
//       </a> */}
//     </div>
//   );
// };

// export default withAuth(Dashboard);

import React from "react";
import { Spin, Image } from "antd";
import { useQuery } from "react-query";
import getAlbums from "@/services/getAlbums";
import Link from "next/link";

const Dashboard = () => {
  const { data: albumsData, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: () => getAlbums(),
    select: (data) => data.data.albums,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          albumsData.map((data: any, index: number) => {
            return (
              <Link
                key={index}
                href={"albums/" + data.id}
                className="cursor-pointer"
              >
                <Image
                  preview={false}
                  alt=""
                  src={data.coverPhotoBaseUrl}
                  className="h-auto max-w-full rounded-lg"
                />
                <p>{data.title}</p>
                <p>{data.mediaItemsCount} Items</p>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Dashboard;
