import { json } from "@remix-run/node";
import NotFound from "~/components/errors/not-found";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function NotFoundPage() {
  return <NotFound />;
}
