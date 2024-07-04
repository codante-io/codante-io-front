import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import { Button } from "~/components/ui/button";
import LinkToLoginWithRedirect from "~/components/features/link-to-login-with-redirect";

function SignInCard() {
  return (
    <Card border="bright" className="text-start">
      <CardHeader className="py-4 sm:py-6">
        <CardTitle>
          <span className="text-lg font-medium text-gray-700 dark:text-gray-50">
            Conteúdo{" "}
            <span className="decoration-green-400 underline">gratuito</span>!
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Este conteúdo é <strong>aberto e gratuito</strong> 🎉. Para acessá-lo,
          você precisa fazer o login.
        </p>
      </CardContent>
      <CardFooter>
        <LinkToLoginWithRedirect className="text-gray-800 w-full grow">
          <Button
            type="button"
            className="flex justify-center items-center gap-2 font-bold w-full sm:py-6"
          >
            <img src="/img/github-logo.svg" alt="Github Logo" />
            Entre com Github
          </Button>
        </LinkToLoginWithRedirect>
      </CardFooter>
    </Card>
  );
}

export default SignInCard;
