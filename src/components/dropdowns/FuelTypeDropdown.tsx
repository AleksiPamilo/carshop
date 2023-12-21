import { IBrand } from "@/interfaces/vehicle";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDictionary } from "../context/DictionaryProvider";

export default function FuelTypeDropdown({ fuelType, onChange, disabled }: {
    fuelType: string | null,
    onChange: (fuelType: string | null) => void,
    disabled?: boolean,
}) {
    const dictionary = useDictionary();

    return (
        <Select value={fuelType ?? undefined} onValueChange={onChange}>
            <SelectTrigger className="w-[10rem]">
                <SelectValue placeholder={dictionary.vehicles.fuelType}>
                    {fuelType ?? dictionary.vehicles.fuelType}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key="unselected"
                    value="unselected"
                >
                    {dictionary.vehicles.fuelType}
                </SelectItem>

                {Object.entries(dictionary.vehicles.fuelTypes).map(([_, value]) => (
                    <SelectItem
                        key={value}
                        value={value}
                    >
                        {value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}