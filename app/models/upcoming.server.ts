import axios from "axios";

export async function getUpcoming() {
  const upcomingData = await axios
    .get(`${process.env.API_HOST}/upcoming`)
    .then((res) => res.data);
  return upcomingData;
}
