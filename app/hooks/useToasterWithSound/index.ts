import toast from "react-hot-toast";
import useSound from "use-sound";

import errorSound from "./error.wav";
import successSound from "./success.mp3";

export const useToasterWithSound = () => {
  const [playSuccess] = useSound(successSound);
  const [playError] = useSound(errorSound);

  const showSuccessToast = (message: string) => {
    playSuccess();
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    playError();
    toast.error(message);
  };

  return {
    showErrorToast,
    showSuccessToast,
  };
};
