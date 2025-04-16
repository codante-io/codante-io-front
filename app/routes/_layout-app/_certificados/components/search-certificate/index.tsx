import { useNavigate } from "react-router";
import { useRef } from "react";
import { Card } from "~/components/ui/cards/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function SearchCertificate({ error }: { error?: boolean }) {
  const inputValueRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = () => {
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
      <Label htmlFor="search-certificate">Código de verificação</Label>
      <Input
        name="search-certificate"
        id="search-certificate"
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
      <Button type="button" onClick={handleSubmit} className="mt-3 self-end">
        Buscar
      </Button>
    </Card>
  );
}
