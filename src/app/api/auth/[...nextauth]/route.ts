import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";

import { JWT } from "next-auth/jwt";
import { Session, Account } from "next-auth";
import { firebaseApp } from "@/firebase/firebaseConfig";
import { getAccessToken } from "@/services/getAccessToken";

interface CustomToken extends JWT {
  expires_at?: number;
  access_token?: string;
  iat?: number;
}

interface CustomSession extends Session {
  accessToken?: string;
}

export type CustomSessionParams = {
  session: CustomSession;
  token: CustomToken;
};

export type CustomJWTParams = {
  token: CustomToken;
  account: Account | null;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: "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",
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          scope:
            "openid https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata https://www.googleapis.com/auth/photoslibrary.appendonly",
          client_id: process.env.CLIENT_ID as string,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: CustomJWTParams) {
      if (account) {
        token.expires_at = account.expires_at;
        token.access_token = account.access_token;

        if (account.refresh_token) {
          await setDoc(
            doc(getFirestore(firebaseApp), "users", account.providerAccountId),
            {
              accessToken: account.access_token,
              uid: account.providerAccountId,
              ...(account.refresh_token && {
                refreshToken: account.refresh_token,
              }),
            }
          );
        } else {
          await updateDoc(
            doc(getFirestore(firebaseApp), "users", account.providerAccountId),
            {
              accessToken: account.access_token,
              uid: account.providerAccountId,
              ...(account.refresh_token && {
                refreshToken: account.refresh_token,
              }),
            }
          );
        }
      } else if (token.expires_at && token.expires_at <= Date.now() / 1000) {
        const tokenData = await getAccessToken(token.sub);

        token.access_token = tokenData?.data.access_token;
        if (token.iat) token.expires_at = token.iat + 3599;
      }
      return token;
    },
    async session({ session, token }: CustomSessionParams) {
      session.accessToken = token.access_token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
