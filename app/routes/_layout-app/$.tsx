import { data } from "react-router";
import NotFound from "~/components/features/error-handling/not-found";

export const loader = () => {
  return data(null, { status: 404 });
};

export default function NotFoundPage() {
  return <NotFound />;
}
