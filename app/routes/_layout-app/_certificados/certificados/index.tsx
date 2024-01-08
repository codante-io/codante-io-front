import { Form } from "@remix-run/react";
import Input from "~/components/features/form/input";

export default function Certificate() {
  return (
    <div className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Buscar certificado
      </h1>
      <Form>
        <Input
          name="search-certificate"
          id="search-certificate"
          label="Código de verificação"
        />
      </Form>
    </div>
  );
}
