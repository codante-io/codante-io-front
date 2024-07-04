import { useOutletContext, useNavigate } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";

import WorkshopDetails from "~/components/features/workshop/workshop-details";
import type { User } from "~/lib/models/user.server";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";

export default function Resolution() {
  const context = useOutletContext<{ challenge: Challenge; user: User }>();
  const user = useUserFromOutletContext();
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
            isFree={!workshop.is_premium}
            userIsPro={user?.is_pro}
          />
        )}
      </div>
    </>
  );
}
