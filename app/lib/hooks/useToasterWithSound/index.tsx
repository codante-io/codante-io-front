import toast from "react-hot-toast";
import useSound from "~/lib/hooks/use-sound/use-sound";
import { useCallback } from "react";

import errorSound from "~/lib/sounds/error.wav";
import successSound from "~/lib/sounds/success.mp3";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

export const useToasterWithSound = () => {
  const [playSuccess] = useSound(successSound);
  const [playError] = useSound(errorSound);

  const showSuccessToast = useCallback(
    (message: string) => {
      playSuccess();
      toast.success(message);
    },
    [playSuccess],
  );

  const showErrorToast = useCallback(
    (message: string) => {
      playError();
      toast.error(message);
    },
    [playError],
  );

  const showSignUpToast = useCallback(
    (message?: string, redirectTo?: string) => {
      playError();

      toast(
        (t) => (
          <Link to={`login?redirectTo=${redirectTo}`}>
            {message ||
              "Esse conteúdo está disponível para nossos usuários cadastrados."}
            <Button className="mt-4 w-full" onClick={() => toast.dismiss(t.id)}>
              Fazer login
            </Button>
          </Link>
        ),
        {
          duration: 4000,
        },
      );
    },
    [playError],
  );

  return {
    showErrorToast,
    showSuccessToast,
    showSignUpToast,
  };
};
