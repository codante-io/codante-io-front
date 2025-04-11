import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

type SearchFilterProps = {
  placeholder?: string;
  debounceTime?: number;
};

export default function SearchFilter({
  placeholder = "Pesquise por um mini projeto...",
  debounceTime = 300,
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceTime]);

  useEffect(() => {
    if (debouncedTerm) {
      const url = new URL(window.location.href);
      url.searchParams.set("q", debouncedTerm);
      return navigate(`${url.pathname}?${url.searchParams.toString()}`, {
        preventScrollReset: true,
      });
    }

    if (debouncedTerm === "") {
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      return navigate(`${url.pathname}?${url.searchParams.toString()}`, {
        preventScrollReset: true,
      });
    }
  }, [debouncedTerm, navigate]);

  return (
    <div className="flex justify-center">
      <div className="relative h-10 w-full">
        <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2  z-10" />

        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-3 py-3 text-sm font-light transition-colors border-[1.5px] cursor-pointer dark:bg-background-800 border-background-300 dark:border-background-600"
        />
      </div>
    </div>
  );
}
