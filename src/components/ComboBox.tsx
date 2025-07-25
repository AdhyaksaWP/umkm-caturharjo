// components/ComboboxDemo.tsx
'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tipeUmkm = [
  { value: "Produk", label: "Produk" },
  { value: "Kerajinan", label: "Kerajinan" },
  { value: "Jasa", label: "Jasa" }
];

type Props = {
  onChange?: (val: string) => void;
  name?: string;
  defaultValue?: string
};

export function ComboboxDemo({ onChange, name, defaultValue="" }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const handleSelect = (currentValue: string) => {
    const newVal = currentValue === value ? "" : currentValue;
    setValue(newVal);
    onChange?.(newVal);
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? tipeUmkm.find((framework) => framework.value === value)?.label
              : "Pilih tipe UMKM..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No result.</CommandEmpty>
              <CommandGroup>
                {tipeUmkm.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={handleSelect}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Hidden input to include selected value in form submission */}
      {name && <input type="hidden" name={name} value={value} />}
    </>
  );
}
