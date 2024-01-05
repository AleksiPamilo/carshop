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
            <SelectTrigger className="w-full md:max-w-[10rem] md:min-w-[8rem]" disabled={disabled}>
                <SelectValue placeholder={dictionary.vehicles.fuelType}>
                    <p className="capitalize">{fuelType ?? dictionary.vehicles.fuelType}</p>
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