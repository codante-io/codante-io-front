import axios from "axios";
import { environment } from "./environment.server";

export async function getUpcoming() {
  const upcomingData: any = await axios
    .get(`${environment().API_HOST}/upcoming`)
    .then((res) => res.data);
  return upcomingData;
}
