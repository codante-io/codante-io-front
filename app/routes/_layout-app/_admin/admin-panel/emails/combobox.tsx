import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils/cn";

import { NewButton as Button } from "../../../../../components/ui/new-button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ChallengeSummary } from "~/lib/models/challenge.server";

export function ComboboxDemo({
  challenges,
}: {
  challenges: ChallengeSummary[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? challenges.find(
                (challenge: ChallengeSummary) => challenge.slug === value,
              )?.name
            : "Selecione o MP..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Busque MP..." />
          <CommandEmpty>MP não encontrado.</CommandEmpty>
          <CommandGroup>
            {challenges.map((challenge: ChallengeSummary) => (
              <CommandItem
                key={challenge.slug}
                value={challenge.slug}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === challenge.slug ? "opacity-100" : "opacity-0",
                  )}
                />
                {challenge.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
