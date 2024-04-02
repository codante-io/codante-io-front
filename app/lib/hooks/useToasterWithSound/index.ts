import toast from "react-hot-toast";
import useSound from "~/lib/hooks/use-sound/use-sound";
import { useCallback } from "react";

import errorSound from "~/lib/sounds/error.wav";
import successSound from "~/lib/sounds/success.mp3";

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

  return {
    showErrorToast,
    showSuccessToast,
  };
};
