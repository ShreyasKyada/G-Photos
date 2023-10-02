import { db } from "@/firebase/firebaseConfig";
import axios from "axios";
import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const getAccessToken = async (uid?: string) => {
  if (uid) {
    const data = await getDoc(doc(db, "users", uid));

    if (data.exists() && data.data()?.refreshToken) {
      try {
        const tokenData = await axios.post(TOKEN_URL, {
          client_id: process.env.CLIENT_ID,
          redirect_uri: process.env.CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: data.data()?.refreshToken,
          client_secret: process.env.CLIENT_SECRET,
        });
        return tokenData;
      } catch (error) {
        console.log("something went wrong", error);
      }
    }
  }
};

// import { db } from "@/firebase/firebaseConfig";
// import axios from "axios";
// import {
//   DocumentSnapshot,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
// } from "firebase/firestore";

// const TOKEN_URL = "https://oauth2.googleapis.com/token";

// const getToken = async (refreshToken: string) => {
//   const tokenData = await axios.post(TOKEN_URL, {
//     client_id: process.env.CLIENT_ID,
//     redirect_uri: "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",
//     grant_type: "refresh_token",
//     refresh_token: refreshToken,
//     client_secret: "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",
//   });
//   return tokenData;
// };

// export const getAccessToken = async (uid?: string, refreshToken?: string) => {
//   console.log("ref", refreshToken, process.env.CLIENT_ID);
//   if (uid) {
//     const data = await getDoc(doc(db, "users", uid));

//     if (data.exists() && data.data()?.refreshToken) {
//       return getToken(data.data()?.refreshToken);
//     }
//   }
//   if (refreshToken) {
//     return getToken(refreshToken);
//   }
// };
