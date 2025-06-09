import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Button } from "~/components/ui/button";
import { CreditCard, QrCode, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getPersonalInfoFormSchema } from "../schema";
import type { PersonalInfoFormValues } from "../schema";

const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

type PersonalInfoFormProps = {
  onSubmit: (
    info: PersonalInfoFormValues,
    paymentMethod: "credit-card" | "pix",
  ) => void;
};

export default function PersonalInfoForm({ onSubmit }: PersonalInfoFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "pix">(
    "credit-card",
  );
  const isAddressRequired = paymentMethod === "credit-card";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(getPersonalInfoFormSchema(isAddressRequired)),
    defaultValues: {
      documentType: "cpf",
      address: {
        state: "SP",
      },
    },
  });

  const documentType = watch("documentType");

  // Format CPF as 000.000.000-00
  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, "");

    if (v.length <= 3) {
      return v;
    } else if (v.length <= 6) {
      return `${v.substring(0, 3)}.${v.substring(3)}`;
    } else if (v.length <= 9) {
      return `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6)}`;
    } else {
      return `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6, 9)}-${v.substring(9, 11)}`;
    }
  };

  // Format CNPJ as 00.000.000/0000-00
  const formatCNPJ = (value: string) => {
    const v = value.replace(/\D/g, "");

    if (v.length <= 2) {
      return v;
    } else if (v.length <= 5) {
      return `${v.substring(0, 2)}.${v.substring(2)}`;
    } else if (v.length <= 8) {
      return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5)}`;
    } else if (v.length <= 12) {
      return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8)}`;
    } else {
      return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8, 12)}-${v.substring(12, 14)}`;
    }
  };

  // Format phone as (00) 00000-0000
  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "");

    if (v.length <= 2) {
      return v.length ? `(${v}` : "";
    } else if (v.length <= 6) {
      return `(${v.substring(0, 2)}) ${v.substring(2)}`;
    } else if (v.length <= 10) {
      return `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
    } else {
      return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7, 11)}`;
    }
  };

  const handleDocumentTypeChange = (value: string) => {
    setValue("documentType", value as "cpf" | "cnpj");
    setValue("document", "");
  };

  const onSubmitForm = (data: PersonalInfoFormValues) => {
    onSubmit(data, paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Método de Pagamento</h3>

        <RadioGroup
          defaultValue="credit-card"
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value as "credit-card" | "pix")
          }
          className="grid grid-cols-2 gap-4"
        >
          <div className="relative">
            <RadioGroupItem
              value="credit-card"
              id="payment-credit-card"
              className="peer sr-only"
            />
            <Label
              htmlFor="payment-credit-card"
              className="flex flex-col items-center justify-between rounded-md border-[1.5px] border-background-200 dark:border-background-700 p-4 hover:bg-background-100 dark:hover:bg-background-700 hover:text-gray-900 dark:hover:text-gray-100 peer-data-[state=checked]:border-background-700 [&:has([data-state=checked])]:border-background-700 dark:peer-data-[state=checked]:border-background-300 transition-all duration-200 dark:peer-data-[state=checked]:text-background-50"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              Cartão de Crédito
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem
              value="pix"
              id="payment-pix"
              className="peer sr-only"
            />
            <Label
              htmlFor="payment-pix"
              className="flex flex-col items-center justify-between rounded-md border-[1.5px] border-background-200 dark:border-background-700 p-4 hover:bg-background-100 dark:hover:bg-background-700 hover:text-gray-900 dark:hover:text-gray-100 peer-data-[state=checked]:border-background-700 [&:has([data-state=checked])]:border-background-700 dark:peer-data-[state=checked]:border-background-300 transition-all duration-200 dark:peer-data-[state=checked]:text-background-50"
            >
              <QrCode className="mb-3 h-6 w-6" />
              PIX
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dados Pessoais</h3>

        <div className="space-y-2">
          <Label>Tipo de Documento</Label>
          <RadioGroup
            defaultValue="cpf"
            value={documentType}
            onValueChange={handleDocumentTypeChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cpf" id="cpf" />
              <Label htmlFor="cpf" className="font-normal">
                CPF
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cnpj" id="cnpj" />
              <Label htmlFor="cnpj" className="font-normal">
                CNPJ
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">
            {documentType === "cpf" ? "CPF" : "CNPJ"}
          </Label>
          <Input
            id="document"
            {...register("document", {
              onChange: (e) => {
                const formattedValue =
                  documentType === "cpf"
                    ? formatCPF(e.target.value)
                    : formatCNPJ(e.target.value);
                e.target.value = formattedValue;
              },
            })}
            placeholder={
              documentType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"
            }
            maxLength={documentType === "cpf" ? 14 : 18}
          />
          {errors.document && (
            <p className="text-sm text-red-500">{errors.document.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Seu nome completo"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              {...register("phone", {
                onChange: (e) => {
                  e.target.value = formatPhone(e.target.value);
                },
              })}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {paymentMethod === "credit-card" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Endereço</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                {...register("address.address")}
                placeholder="Rua, Avenida, etc."
              />
              {errors.address?.address && (
                <p className="text-sm text-red-500">
                  {errors.address.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                {...register("address.number")}
                placeholder="123"
              />
              {errors.address?.number && (
                <p className="text-sm text-red-500">
                  {errors.address.number.message}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                {...register("address.complement")}
                placeholder="Apto, Bloco, etc. (opcional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                {...register("address.neighborhood")}
                placeholder="Seu bairro"
              />
              {errors.address?.neighborhood && (
                <p className="text-sm text-red-500">
                  {errors.address.neighborhood.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                {...register("address.city")}
                placeholder="Sua cidade"
              />
              {errors.address?.city && (
                <p className="text-sm text-red-500">
                  {errors.address.city.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Select
                value={watch("address.state")}
                onValueChange={(value) => setValue("address.state", value)}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {BRAZILIAN_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.address?.state && (
                <p className="text-sm text-red-500">
                  {errors.address.state.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full flex items-center justify-center gap-2"
      >
        Continuar <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
