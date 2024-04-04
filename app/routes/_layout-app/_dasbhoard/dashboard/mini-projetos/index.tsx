import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";

export default function ChallengeDashboard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-normal">
            Mini Projetos <span className="font-semibold">concluídos</span>
          </CardTitle>
          <CardDescription>Mini Projetos que você já concluiu.</CardDescription>
        </CardHeader>
        <CardContent>{/* todo */}</CardContent>
        <CardFooter className="border-t px-6 py-4">{/* todo */}</CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-normal">
            Mini Projetos <span className="font-semibold">em andamento</span>
          </CardTitle>
          <CardDescription>
            Mini Projetos que você iniciou mas não concluiu.
          </CardDescription>
        </CardHeader>
        <CardContent>{/* todo */}</CardContent>
        {/* <CardFooter className="border-t px-6 py-4">todo</CardFooter> */}
      </Card>
    </>
  );
}
