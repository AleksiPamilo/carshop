import { IBrand } from "@/interfaces/vehicle";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDictionary } from "../context/DictionaryProvider";

export default function BrandDropdown({ brands, currentBrand, handleMake }: {
    brands: IBrand[],
    currentBrand: IBrand | null,
    handleMake: (brand: IBrand) => void,
}) {
    const dictionary = useDictionary();

    return (
        <Select>
            <SelectTrigger className="w-[7rem]">
                <SelectValue placeholder={dictionary.vehicles.brand}>
                    {currentBrand?.name}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {brands.map(brand => (
                    <SelectItem
                        key={brand.id}
                        value={brand.name}
                    // onClick={() => handleMake(brand)}
                    >
                        {brand.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}