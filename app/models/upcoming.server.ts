import axios from "axios";

export async function getUpcoming() {
  const upcomingData: any = await axios
    .get(`${process.env.API_HOST}/upcoming`)
    .then((res) => res.data);
  return upcomingData;
}
