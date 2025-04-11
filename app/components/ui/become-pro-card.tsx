import { Link } from "react-router";
import {
  MovingBorderCard,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import { Button } from "~/components/ui/button";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";

function BecomeProCard({ hideContent = false }: { hideContent?: boolean }) {
  return (
    <Card border="bright" className="text-start">
      <CardHeader>
        <CardTitle>
          <span className="text-lg font-medium text-gray-700 dark:text-gray-50">
            Acesso exclusivo para membros <ProSpanWrapper>PRO</ProSpanWrapper>
          </span>
        </CardTitle>
      </CardHeader>
      {!hideContent && (
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Esse conteúdo é exclusivo para nossos assinantes.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Libere esse e muito mais conteúdo assinando o <b>Codante</b>{" "}
            <ProSpanWrapper>PRO</ProSpanWrapper>.
          </p>{" "}
        </CardContent>
      )}
      <CardFooter>
        <div className="flex gap-4 w-full sm:mt-4">
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

export function SmallBecomeProCard() {
  return (
    <MovingBorderCard
      border="dull"
      movingBorderColor="pro"
      className="w-full md:w-[400px] text-center relative text-sm"
    >
      <CardHeader>
        <CardTitle className="md:text-md lg:text-lg xl:text-lg text-xs">
          <span className="font-medium text-gray-700 dark:text-gray-50">
            Acesso exclusivo para membros <ProSpanWrapper>PRO</ProSpanWrapper>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <Link to="/planos" className="w-full text-xs md:text-md">
          <Button variant="pro" className="w-full font-bold">
            Assinar agora
          </Button>
        </Link>
      </CardContent>
    </MovingBorderCard>
  );
}

export default BecomeProCard;
