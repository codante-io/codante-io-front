import { http, HttpResponse } from "msw";
import { homeMock } from "./apiMocks/home";

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json({
      firstName: "John",
      lastName: "Maverick",
    });
  }),

  http.get("http://127.0.0.1:8000/api/home", () => {
    return HttpResponse.json(homeMock);
  }),


  http.post("http://localhost:3001/ping", () => {
    return HttpResponse.json({ message: "pong" });
  }),
];
