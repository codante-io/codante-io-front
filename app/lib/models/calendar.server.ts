import { createAxios } from "~/lib/services/axios.server";

export type CalendarEvent = {
  id: string;
  title: string;
  type: string;
  description: string;
  datetime: string;
  image_url: string;
  url: string;
  slug: string;
};

export async function getUpcomingEvents(): Promise<Array<CalendarEvent>> {
  const axios = await createAxios();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 1);

  const events: CalendarEvent[] = await axios
    .get("/calendar", {
      params: {
        start_date: startDate,
      },
    })
    .then((res) => res.data);
  return events;
}

export async function getPreviousEvents(): Promise<Array<CalendarEvent>> {
  const axios = await createAxios();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);

  const events: CalendarEvent[] = await axios
    .get("/calendar", {
      params: {
        end_date: endDate,
      },
    })
    .then((res) => res.data);
  return events;
}
