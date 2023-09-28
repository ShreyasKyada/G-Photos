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
          redirect_uri: "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",
          grant_type: "refresh_token",
          refresh_token: data.data()?.refreshToken,
          client_secret: "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",
        });
        return tokenData;
      } catch (error) {
        console.log("something went wrong", error);
      }
    }
  }
};
