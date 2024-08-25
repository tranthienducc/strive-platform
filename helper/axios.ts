import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const lemonSqueezyApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LEMON_SQUERY_ENDPOINT,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
  },
});
