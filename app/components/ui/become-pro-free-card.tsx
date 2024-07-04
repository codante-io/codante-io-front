import { Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import { Button } from "~/components/ui/button";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";

function BecomeProFreeCard() {
  return (
    <Card border="bright" className="text-start">
      <CardHeader>
        <CardTitle>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-50">
            Esse conteúdo é{" "}
            <span className="underline bold decoration-2 decoration-green-400">
              gratuito
            </span>
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Você pode acessá-lo gratuitamente.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Para liberar todos os conteúdos e apoiar nosso projeto, você pode
          assinar o <b>Codante</b> <ProSpanWrapper>PRO</ProSpanWrapper>.
        </p>{" "}
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full mt-6">
          <Link to="/assine" className="w-full">
            <Button variant="secondary" className="w-full font-bold">
              Saiba mais
            </Button>
          </Link>
          <Link to="/planos" className="w-full">
            <Button variant="pro" className="w-full font-bold">
              Assinar agora
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default BecomeProFreeCard;
