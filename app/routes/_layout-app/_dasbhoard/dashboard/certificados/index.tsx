import { Button } from "~/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";

export default function CertificateDashboard() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Certificados</h1>
      <Card>
        <CardHeader>
          <CardTitle>Mini Projetos</CardTitle>
          <CardDescription>
            Certificados de conclusão de Mini Projetos.
          </CardDescription>
        </CardHeader>
        <CardContent>{/* todo   */}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Workshops</CardTitle>
          <CardDescription>
            Certificados de conclusão de Workshops.
          </CardDescription>
        </CardHeader>
        <CardContent>{/* todo */}</CardContent>
      </Card>
    </>
  );
}
