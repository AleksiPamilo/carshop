import { useState, useEffect } from 'react';
import { useDebounce } from "@/hooks";
import { useDictionary } from "./context/DictionaryProvider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function DoubleInput({ label, from, to, onChange, disabled }: {
    label: string,
    from: string | null,
    to: string | null,
    onChange: (value: { from: string | null, to: string | null }) => void,
    disabled?: boolean,
}) {
    const dictionary = useDictionary();
    const [internalFrom, setInternalFrom] = useState<string | null>(from);
    const [internalTo, setInternalTo] = useState<string | null>(to);
    const debouncedFrom = useDebounce(internalFrom, 500);
    const debouncedTo = useDebounce(internalTo, 500);

    useEffect(() => {
        onChange({ from: debouncedFrom, to: debouncedTo });
    }, [debouncedFrom, debouncedTo]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Backspace", "Delete", "Tab", "Escape", "Enter"].includes(e.key) || (e.key === "a" && e.ctrlKey)) {
            return;
        }

        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <div className="flex flex-col gap-1.5 w-full relative">
            <Label className="" htmlFor={label.toLowerCase()}>
                {label}
            </Label>
            <div className="flex w-full divide-x-[1px]">
                <Input className="rounded-r-none border-r-0" placeholder={dictionary.common.min} disabled={disabled} id={label.toLowerCase()}
                    value={internalFrom ?? undefined}
                    onKeyDown={handleKeyDown}
                    onChange={e => {
                        setInternalFrom(e.target.value);
                    }}
                />

                <Input className="rounded-l-none border-l-0" placeholder={dictionary.common.max} disabled={disabled}
                    value={internalTo ?? undefined}
                    onKeyDown={handleKeyDown}
                    onChange={e => {
                        setInternalTo(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}