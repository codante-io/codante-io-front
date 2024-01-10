import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import Input from "~/components/features/form/input";
import Button from "~/components/ui/button";

export default function Certificate() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/certificados/${inputValue}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-brand text-xl font-bold mb-10">
        Buscar certificado pelo código de verificação
      </h1>
      <div className="w-56">
        <Input
          name="search-certificate"
          id="search-certificate"
          label="Código de verificação"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=""
        />
        <Button type="submit" onClick={handleSubmit} className="mt-3">
          Buscar
        </Button>
      </div>
    </div>
  );
}
