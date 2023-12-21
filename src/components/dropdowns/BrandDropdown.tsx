import { IBrand } from "@/interfaces/vehicle";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDictionary } from "../context/DictionaryProvider";

export default function BrandDropdown({ brands, currentBrand, onChange, disabled }: {
    brands: IBrand[],
    currentBrand: IBrand | null,
    onChange: (brand: IBrand | null) => void,
    disabled?: boolean,
}) {
    const dictionary = useDictionary();

    return (
        <Select value={currentBrand?.name} onValueChange={(value) => {
            const brand = brands.find(brand => brand.name === value);
            onChange(brand ?? null);
        }}>
            <SelectTrigger className="w-[10rem]">
                <SelectValue placeholder={dictionary.vehicles.brand}>
                    {currentBrand?.name ?? dictionary.vehicles.brand}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key="unselected"
                    value="unselected"
                >
                    {dictionary.vehicles.brand}
                </SelectItem>

                {brands.map(brand => (
                    <SelectItem
                        key={brand.id}
                        value={brand.name}
                    >
                        {brand.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}