import { useNavigate, useOutletContext } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import type { ChallengeUser } from "~/lib/models/user.server";

export default function WorkshopsDashboard() {
  const challengeUser: ChallengeUser = useOutletContext();
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Workshops{" "}
            <span className="font-semibold text-brand-500">Concluídos</span>
          </CardTitle>
          <CardDescription>Workshops que você já concluiu.</CardDescription>
        </CardHeader>
        <CardContent>{/* todo */}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Workshops{" "}
            <span className="font-semibold text-brand-500">em execução</span>
          </CardTitle>
          <CardDescription>
            Workshops que você iniciou mas não concluiu.
          </CardDescription>
        </CardHeader>
        <CardContent>{/* todo */}</CardContent>
      </Card>
    </>
  );
}
