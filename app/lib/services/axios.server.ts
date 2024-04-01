import axios from "axios";
import { environment } from "~/lib/models/environment";

let client = axios.create({
  baseURL: environment().API_HOST,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default client;
