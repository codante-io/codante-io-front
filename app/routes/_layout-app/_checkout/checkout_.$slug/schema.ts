import * as z from "zod";
import { cpf, cnpj } from "cpf-cnpj-validator";

// Base form schema with common fields for all payment methods
const baseFormSchema = z.object({
  paymentMethod: z.enum(["credit_card", "boleto", "pix"]),
  planName: z.string(),
});

// Credit card specific schema
const creditCardSchema = baseFormSchema.extend({
  paymentMethod: z.literal("credit_card"),
  cardToken: z.string().min(1, "Token do cartão é obrigatório"),
  cardName: z.string().min(3, "Nome no cartão é obrigatório"),
  document: z.string().min(11, "CPF/CNPJ é obrigatório"),
  installments: z.string().min(1, "Escolha o número de parcelas"),
});

// PIX specific schema
const pixSchema = baseFormSchema.extend({
  paymentMethod: z.literal("pix"),
});

// Combined form schema with discriminated union
export const checkoutFormSchema = z.discriminatedUnion("paymentMethod", [
  creditCardSchema,
  pixSchema,
]);

const addressSchema = z.object({
  address: z.string().min(3, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatório"),
  state: z.string().min(2, "Estado é obrigatório"),
});

export function getPersonalInfoFormSchema(isAddressRequired: boolean) {
  return z
    .object({
      documentType: z.enum(["cpf", "cnpj"]),
      name: z.string().min(3, "Nome completo é obrigatório"),
      document: z.string().min(11, "Documento é obrigatório"),
      email: z.string().email("Email inválido"),
      phone: z.string().min(11, "Telefone é obrigatório"),
      address: isAddressRequired
        ? addressSchema // required
        : addressSchema.optional(), // optional
    })
    .superRefine((data, ctx) => {
      if (data.documentType === "cpf" && !cpf.isValid(data.document)) {
        ctx.addIssue({
          path: ["document"],
          code: z.ZodIssueCode.custom,
          message: "CPF inválido",
        });
      }
      if (data.documentType === "cnpj" && !cnpj.isValid(data.document)) {
        ctx.addIssue({
          path: ["document"],
          code: z.ZodIssueCode.custom,
          message: "CNPJ inválido",
        });
      }
    });
}

// Type inference
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
export type PersonalInfoFormValues = z.infer<
  ReturnType<typeof getPersonalInfoFormSchema>
>;
