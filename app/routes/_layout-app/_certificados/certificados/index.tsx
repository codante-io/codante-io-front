import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import Input from "~/components/features/form/input";
import Button from "~/components/ui/button";
import { Card } from "~/components/ui/cards/card";

export default function Certificate() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/certificados/${inputValue}`);
  };

  return (
    <div className="mx-auto flex justify-center mt-10">
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=""
        />
        <Button type="button" onClick={handleSubmit} className="mt-3 self-end">
          Buscar
        </Button>
      </Card>
    </div>
  );
}
