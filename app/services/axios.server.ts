import axios from "axios";

let client = axios.create({
  baseURL: process.env.API_HOST,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default client;
