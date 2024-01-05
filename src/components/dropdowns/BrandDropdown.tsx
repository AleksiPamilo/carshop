"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IBrand } from "@/interfaces/vehicle"
import { useDictionary } from "../context/DictionaryProvider"
import { ScrollArea } from "../ui/scroll-area"

export default function BrandDropdown({ brands, onChange, selected, disabled }: {
    brands: IBrand[],
    onChange: (brand: IBrand | null) => void,
    selected: string | null,
    disabled?: boolean,
}) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | null>(selected);

    const dictionary = useDictionary();

    React.useEffect(() => {
        if (value === null) {
            setValue(selected);
        }
    }, [selected]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <Button variant='outline' role='combobox' aria-expanded={open} className='w-full md:w-[10rem] justify-between'>
                    {value ? brands.find((brand) => brand.slug === value)?.name : dictionary.vehicles.brand}
                    <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full md:w-[10rem] p-0'>
                <Command>
                    <CommandInput placeholder={dictionary.common.searchBrand} />
                    <ScrollArea className='max-h-[20rem] overflow-auto'>
                        <CommandEmpty>{dictionary.common.errors.brandNotFound}</CommandEmpty>
                        <CommandGroup>
                            {brands.map((brand) => (
                                <CommandItem
                                    key={brand.id}
                                    value={brand.slug}
                                    onSelect={(currentValue) => {
                                        const brand = currentValue === value ? null : brands.find((b) => b.slug === currentValue);
                                        setValue(brand?.slug ?? "");
                                        onChange(brand ?? null);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === brand.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {brand.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
}