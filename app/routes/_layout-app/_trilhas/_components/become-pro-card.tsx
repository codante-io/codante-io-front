import { Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import { NewButton } from "~/components/ui/new-button";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";

function BecomeProCard() {
  return (
    <Card border="bright" className="text-start">
      <CardHeader>
        <CardTitle>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-50">
            Acesso exclusivo para membros <ProSpanWrapper>PRO</ProSpanWrapper>
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Nossas trilhas são exclusivas para nossos assinantes. <br />
          <br />
          Considere se inscrever para ter acesso a conteúdos exclusivos.
        </p>
      </CardContent>
      <CardFooter>
        <Link to="/assine" className="w-full">
          <NewButton variant="pro" className="w-full font-bold">
            Saiba mais
          </NewButton>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default BecomeProCard;
