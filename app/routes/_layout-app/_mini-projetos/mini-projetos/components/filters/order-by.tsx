import { useNavigate, useSearchParams } from "@remix-run/react";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const options = [
  { value: "popular", label: "Mais populares" },
  { value: "facil", label: "Mais fáceis" },
  { value: "dificil", label: "Mais difíceis" },
  { value: "recente", label: "Mais recentes" },
  { value: "antigo", label: "Mais antigos" },
];

export default function OrderBySelect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("ordenacao") || options[0].value,
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("ordenacao", selectedOption);
    navigate(`${url.pathname}?${url.searchParams.toString()}`, {
      preventScrollReset: true,
    });
  }, [selectedOption, navigate]);

  return (
    <Select value={selectedOption} onValueChange={setSelectedOption}>
      <SelectTrigger className="w-full min-w-48 border-[1.5px] border-background-300 rounded-md focus:outline-none focus:border-brand-300 dark:bg-background-800 dark:text-gray-300 dark:border-background-600 font-light">
        <div className="flex items-center gap-2">
          <ArrowDownUp className="w-4 h-4" />
          <SelectValue placeholder="Ordenar por" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
