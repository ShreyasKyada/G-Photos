"use client";
import axios from "axios";

export function googleLogIn() {
  axios.get("/api/auth/signin");
}
