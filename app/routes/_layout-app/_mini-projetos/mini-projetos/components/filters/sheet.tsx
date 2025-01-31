import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { useState } from "react";
import { Link, useSearchParams } from "@remix-run/react";
import { ListFilter } from "lucide-react";
import { Separator } from "~/components/ui/separator";

import { DifficultyFilter, MainTechFilter, FreeFilter } from "./index";

export function FiltersSheet() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedTechs = searchParams.get("tecnologia");
  const selectedDifficulty = searchParams.get("dificuldade");
  const selectedFree = searchParams.get("gratuito");
  const q = searchParams.get("q");
  const ordenacao = searchParams.get("ordenacao");

  let totalFilters = q ? searchParams.size - 1 : searchParams.size;

  if (ordenacao) {
    totalFilters--;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex flex-col gap-2 min-w-32 justify-start">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-light w-full justify-start "
          >
            <ListFilter className="w-4 h-4" /> Filtros
            <span className="text-xstext-gray-500 dark:text-gray-400">
              {totalFilters > 0 ? ` (${totalFilters})` : ""}
            </span>
          </Button>
          {totalFilters > 0 && (
            <Link
              to="/mini-projetos"
              preventScrollReset
              prefetch="intent"
              className="text-xs underline dark:text-gray-400 text-gray-500"
            >
              Limpar filtros
            </Link>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ListFilter className="w-4 h-4" /> Filtros
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="tech" className="text-right">
              Tecnologia
            </Label>
            <div className="flex-1">
              <MainTechFilter
                selectedTechs={selectedTechs}
                baseUrl="/mini-projetos"
                techsToDisplay={[
                  "nextjs",
                  "tailwindcss",
                  "react",
                  "fundamentos",
                  "hackathon",
                ]}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="difficulty" className="text-right">
              Dificuldade
            </Label>
            <div className="flex-1">
              <DifficultyFilter
                selectedDifficulty={selectedDifficulty}
                baseUrl="/mini-projetos"
                difficultiesToDisplay={["newbie", "intermediate", "advanced"]}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="free" className="text-right">
              Tipo
            </Label>
            <FreeFilter
              selectedFilter={selectedFree}
              baseUrl="/mini-projetos"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
