import type React from "react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import { getPublicEnv } from "~/components/_layouts/public-env";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import type { CheckoutFormValues } from "../schema";

interface CreditCardFormProps {
  form: UseFormReturn<CheckoutFormValues>;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function CreditCardForm({ form, formRef }: CreditCardFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  // We need to handle card information outside of form since it's sensitive
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  // Handle credit card token generation and form submission
  const handleCreditCardSubmit = async () => {
    console.log("handleCreditCardSubmit");

    try {
      setIsProcessing(true);

      // Get card token from Pagarme
      const response = await fetch(
        `https://api.pagar.me/core/v5/tokens?appId=${getPublicEnv("PAGARME_PUBLIC_KEY")}`,
        {
          method: "POST",
          body: JSON.stringify({
            type: "card",
            card: {
              number: cardNumber.replace(/\s+/g, ""),
              holder_name: form.getValues("cardName"),
              exp_month: expiryDate.split("/")[0],
              exp_year: expiryDate.split("/")[1],
              cvv: cvv,
            },
          }),
        },
      );

      const data = await response.json();

      form.setValue("cardToken", data.id);

      const isValid = await form.trigger();

      console.log("isValid", isValid);

      if (!isValid) {
        return;
      }

      formRef.current?.requestSubmit();
    } catch (error) {
      console.error("Error processing credit card:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="document"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>CPF ou CNPJ</FormLabel>
            <FormControl>
              <Input
                placeholder="000.000.000-00"
                maxLength={19}
                className="dark:bg-background-700 dark:border-background-600"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel htmlFor="card-number">Número do Cartão</FormLabel>
        <div className="relative bg-grainy rounded-md overflow-hidden">
          <Input
            id="card-number"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="pl-10 dark:bg-background-700 dark:border-background-600"
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-background-300" />
        </div>
      </div>

      <FormField
        control={form.control}
        name="cardName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Nome no Cartão</FormLabel>
            <FormControl>
              <Input
                placeholder="NOME COMO ESTÁ NO CARTÃO"
                className="dark:bg-background-700 dark:border-background-600"
                {...field}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel htmlFor="expiry">Validade</FormLabel>
          <Input
            id="expiry"
            placeholder="MM/AA"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
            className="dark:bg-background-700 dark:border-background-600"
          />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="cvv">CVV</FormLabel>
          <div className="relative bg-grainy rounded-md overflow-hidden">
            <Input
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={4}
              className="pl-10 dark:bg-background-700 dark:border-background-600 dark:autofill:bg-transparent"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-background-300" />
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="installments"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Parcelas</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o número de parcelas" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">1x de R$ 299,90 (sem juros)</SelectItem>
                <SelectItem value="2">2x de R$ 149,95 (sem juros)</SelectItem>
                <SelectItem value="3">3x de R$ 99,97 (sem juros)</SelectItem>
                <SelectItem value="4">4x de R$ 74,98 (sem juros)</SelectItem>
                <SelectItem value="5">5x de R$ 59,98 (sem juros)</SelectItem>
                <SelectItem value="6">6x de R$ 49,98 (sem juros)</SelectItem>
                <SelectItem value="7">7x de R$ 44,84 (com juros)</SelectItem>
                <SelectItem value="8">8x de R$ 39,74 (com juros)</SelectItem>
                <SelectItem value="9">9x de R$ 35,87 (com juros)</SelectItem>
                <SelectItem value="10">10x de R$ 32,79 (com juros)</SelectItem>
                <SelectItem value="11">11x de R$ 30,27 (com juros)</SelectItem>
                <SelectItem value="12">12x de R$ 28,16 (com juros)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-4">
        <Lock className="h-4 w-4" />
        <span>
          Pagamento processado pela Pagarme (Stone) e protegido por SSL
        </span>
      </div>

      <Button
        className="w-full"
        onClick={handleCreditCardSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processando...
          </>
        ) : (
          `Finalizar Pagamento (R$ 299,90)`
        )}
      </Button>
    </div>
  );
}
