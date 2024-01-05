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
import { IModel } from "@/interfaces/vehicle"
import { useDictionary } from "../context/DictionaryProvider"
import { ScrollArea } from "../ui/scroll-area"

export default function ModelDropdown({ models, onChange, selected, disabled }: {
    models: IModel[],
    onChange: (model: IModel | null) => void,
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
    }, [value, selected]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <Button variant='outline' role='combobox' aria-expanded={open} className='w-full md:w-[10rem] justify-between'>
                    {value ? models.find((model) => model.slug === value)?.name : dictionary.vehicles.model}
                    <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full md:w-[10rem] p-0'>
                <Command>
                    <CommandInput placeholder={dictionary.common.searchModel} />
                    <ScrollArea className='h-[20rem] overflow-auto'>
                        <CommandEmpty>{dictionary.common.errors.modelNotFound}</CommandEmpty>
                        <CommandGroup>
                            {models.map((model) => (
                                <CommandItem
                                    key={model.id}
                                    value={model.slug}
                                    onSelect={(currentValue) => {
                                        const model = currentValue === value ? null : models.find((model) => model.slug === currentValue);
                                        setValue(model?.slug ?? "");
                                        onChange(model ?? null);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === model.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {model.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
}