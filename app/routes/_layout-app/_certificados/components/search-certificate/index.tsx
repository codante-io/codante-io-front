import { useNavigate } from "@remix-run/react";
import { useRef } from "react";
import Input from "~/components/features/form/input";
import { Card } from "~/components/ui/cards/card";
import { NewButton } from "~/components/ui/new-button";

export default function SearchCertificate({ error }: { error?: boolean }) {
  const inputValueRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/certificados/${inputValueRef.current}`);
  };
  return (
    <Card
      className="px-8 mx-5 py-5 flex flex-col w-96"
      border="dull"
      rounded="2xl"
    >
      <h1 className="text-lg text-gray-700 dark:text-gray-50 mb-8">
        Verificar Certificado
      </h1>
      <Input
        name="search-certificate"
        id="search-certificate"
        label="Código de verificação"
        defaultValue={inputValueRef.current}
        onChange={(e) => (inputValueRef.current = e.target.value)}
        className=""
      />
      {error ? (
        <span className="text-red-500 text-xs mt-1 opacity-80">
          Certificado inválido
        </span>
      ) : (
        ""
      )}
      <NewButton type="button" onClick={handleSubmit} className="mt-3 self-end">
        Buscar
      </NewButton>
    </Card>
  );
}
