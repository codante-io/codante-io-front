import axios from "axios";
import { environment } from "~/models/environment.server";

let client = axios.create({
  baseURL: environment().API_HOST,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default client;
