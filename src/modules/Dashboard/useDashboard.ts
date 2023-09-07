import React, { useEffect } from "react";
import axios from "axios";

const clientId =
  "316485911822-pu2447j1qunjk6jrv1e5nj79k78t845o.apps.googleusercontent.com";
const redirectUri = "http://localhost:3000/api/signin";
// const scope = "";

const useDashboard = () => {
  const onSignInWithGoogleClickHandler = () => {
    const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/photoslibrary.readonly`;

    // window.open(authorizationUrl, "_blank", "width=600,height=600");
    window.location.href = authorizationUrl;
  };

  // useEffect(() => {
  //   console.log("Use effect working hurray");
  //   axios.get("/api/signin");
  // }, []);

  return {
    onSignInWithGoogleClickHandler,
  };
};

export default useDashboard;
