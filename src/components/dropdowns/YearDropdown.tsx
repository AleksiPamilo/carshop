import { IBrand } from "@/interfaces/vehicle";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDictionary } from "../context/DictionaryProvider";

export default function YearDropdown({ min, max, onChange, disabled }: {
    min: string | null,
    max: string | null,
    onChange: (years: { min: string | null, max: string | null }) => void,
    disabled?: boolean,
}) {
    const dictionary = useDictionary();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 2 }, (_, i) => 1900 + i).reverse();

    return (
        <div className="flex">
            <Select value={min ?? undefined} onValueChange={v => onChange({ min: v, max: max ?? null })} disabled={disabled}>
                <SelectTrigger className="w-[8rem] rounded-r-none">
                    <SelectValue placeholder={dictionary.common.min}>
                        {min ?? dictionary.common.min}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        key="unselected"
                        value="unselected"
                    >
                        {dictionary.common.min}
                    </SelectItem>

                    {
                        years.map(year => (
                            <SelectItem
                                key={year}
                                value={String(year)}
                            >
                                {year}
                            </SelectItem>
                        ))
                    }

                </SelectContent>
            </Select>

            <Select value={max ?? undefined} onValueChange={v => onChange({ min: min ?? null, max: v })} disabled={disabled}>
                <SelectTrigger className="w-[8rem] rounded-l-none">
                    <SelectValue placeholder={dictionary.common.max}>
                        {max ?? dictionary.common.max}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        key="unselected"
                        value="unselected"
                    >
                        {dictionary.common.max}
                    </SelectItem>

                    {
                        years.map(year => (
                            <SelectItem
                                key={year}
                                value={String(year)}
                            >
                                {year}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}