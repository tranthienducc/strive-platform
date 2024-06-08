import axios from "axios";
import dotenv from "dotenv";

export const LEMON_SQUERY_ENDPOINT = "https://api.lemonsqueezy.com/v1/";

dotenv.config();

export const lemonSqueezyApiInstance = axios.create({
  baseURL: LEMON_SQUERY_ENDPOINT,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
  },
});
