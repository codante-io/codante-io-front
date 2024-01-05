import { json } from "@remix-run/node";
import NotFound from "~/components/features/error-handling/not-found";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function NotFoundPage() {
  return <NotFound />;
}
