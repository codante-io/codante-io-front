import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Clock, Copy, QrCode, RefreshCw } from "lucide-react";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";
import type { UseFormReturn } from "react-hook-form";
import type { CheckoutFormValues } from "../schema";
import { useFetcher } from "@remix-run/react";

interface PixFormProps {
  form: UseFormReturn<CheckoutFormValues>;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function PixForm({ form, formRef }: PixFormProps) {
  const toast = useToasterWithSound();
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [pixCopied, setPixCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [pixQRCodeUrl, setPixQRCodeUrl] = useState("");

  const fetcher = useFetcher({ key: "checkout" });

  const generatePixPayment = async () => {
    try {
      setIsProcessing(true);

      formRef.current?.requestSubmit();
    } catch (error) {
      console.error("Error processing credit card:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    console.log("fetcher", fetcher.data);

    if (!fetcher.data) return;

    const { qr_code: qrCode, qr_code_url: qrCodeUrl } =
      fetcher.data?.transaction;

    if (qrCode && qrCodeUrl) {
      setPixCode(qrCode);
      setPixQRCodeUrl(qrCodeUrl);
    }
  }, [fetcher.data]);

  useEffect(() => {
    generatePixPayment();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    toast.showSuccessToast("Código PIX copiado!");

    setTimeout(() => {
      setPixCopied(false);
    }, 3000);
  };

  const refreshPix = () => {
    setCountdown(900);
    toast.showSuccessToast("Código PIX atualizado!");

    // In a real application, we would generate a new PIX code here
    // and then submit the form to process the payment
    form.handleSubmit((values) => {
      console.log("PIX form refreshed with values:", values);
    })();
  };

  // With the generated QR code, the user will make the payment outside our app
  // Once payment is confirmed, the backend would notify our app and we would process it
  const handleSubmitPix = () => {
    form.handleSubmit((values) => {
      console.log("PIX form submitted", values);
    })();
  };

  return (
    <div className="space-y-6">
      <Alert
        variant="default"
        className="bg-green-50 text-green-800 border-green-200"
      >
        <QrCode className="h-4 w-4" />
        <AlertDescription>
          Pagamento instantâneo! Após o pagamento via PIX, a confirmação é
          imediata.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-amber-500" />
          <span>
            Este código PIX expira em{" "}
            <span className="font-medium">{formatTime(countdown)}</span>
          </span>
        </div>

        <div className="overflow-hidden rounded-lg p-4 dark:bg-background-700 bg-white w-full max-w-xs mx-auto bg-grainy">
          <div className="bg-background-50 dark:bg-background-800 p-4 rounded-md flex justify-center">
            <img src={pixQRCodeUrl} alt="QR Code gerado pelo Pagar.me" />
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={refreshPix}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Atualizar QR Code
            </Button>
          </div>
        </div>

        <div className="w-full">
          <div className="text-sm font-medium mb-2">
            Ou copie e cole o código PIX:
          </div>
          <div className="flex">
            <div className="bg-background-50 dark:bg-background-800 border-[1.5px] border-r-0 dark:border-background-600 rounded-l-md p-2 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis flex-1 dark:text-gray-400 text-gray-600">
              {pixCode}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-l-none"
              onClick={copyPixCode}
            >
              <Copy className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">
                {pixCopied ? "Copiado!" : "Copiar"}
              </span>
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center max-w-md">
          Abra o aplicativo do seu banco, escolha a opção PIX e escaneie o QR
          code ou cole o código acima para realizar o pagamento.
        </div>

        <Button className="w-full" onClick={handleSubmitPix}>
          Confirmar Pagamento
        </Button>
      </div>
    </div>
  );
}
