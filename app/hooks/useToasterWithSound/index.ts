import toast from "react-hot-toast";
import useSound from "use-sound";
import { useCallback } from "react";

import errorSound from "~/sounds/error.wav";
import successSound from "~/sounds/success.mp3";

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
