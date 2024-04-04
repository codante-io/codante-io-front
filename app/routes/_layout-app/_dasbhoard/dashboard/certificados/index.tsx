import { Button } from "~/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/shadcn/card";
import { Checkbox } from "~/components/ui/shadcn/checkbox";
import { Input } from "~/components/ui/shadcn/input";

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
        <CardContent>
          <form>
            <Input placeholder="Store Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Workshops</CardTitle>
          <CardDescription>
            Certificados de conclusão de Workshops.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input placeholder="Project Name" defaultValue="/content/plugins" />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" defaultChecked />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
