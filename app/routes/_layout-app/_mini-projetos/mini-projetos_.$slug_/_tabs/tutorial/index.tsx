import { useOutletContext, useNavigate } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";

import WorkshopDetails from "~/components/features/workshop/workshop-details";

export default function Resolution() {
  const context = useOutletContext<{ challenge: Challenge }>();
  const navigate = useNavigate();
  const challenge = context?.challenge;
  const workshop = challenge?.workshop;

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  return (
    <>
      <div className="container">
        {workshop && (
          <WorkshopDetails
            workshop={workshop}
            nextLesson={workshop.lessons[0]}
            showDescription={false}
          />
        )}
      </div>
    </>
  );
}
