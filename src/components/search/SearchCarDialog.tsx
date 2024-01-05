import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useDictionary } from "../context/DictionaryProvider";
import { ISearchData } from "./SearchCar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import YearDropdown from "../dropdowns/YearDropdown";
import DoubleInput from "../DoubleInput";

type SearchCarDialogProps = {
    searchData: ISearchData,
    setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>
}

export default function SearchCarDialog({
    searchData,
    setSearchData
}: SearchCarDialogProps) {
    const dictionary = useDictionary();

    return (
        <div className="flex">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        {dictionary.common.moreOptions}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 py-2 px-3">
                        {dictionary.common.moreOptions}
                    </div>

                    <div className="w-full flex flex-col gap-5 mt-3">
                        <YearDropdown
                            min={searchData.minYear}
                            max={searchData.maxYear}
                            onChange={(years) => setSearchData(prev => ({
                                ...prev,
                                minYear: years.min,
                                maxYear: years.max
                            }))}
                        />

                        <DoubleInput
                            label={dictionary.vehicles.price}
                            from={searchData.priceFrom}
                            to={searchData.priceTo}
                            onChange={(price) => setSearchData(prev => ({
                                ...prev,
                                priceFrom: price.from,
                                priceTo: price.to
                            }))}
                        />

                        <DoubleInput
                            label={dictionary.vehicles.mileage}
                            from={searchData.mileageFrom}
                            to={searchData.mileageTo}
                            onChange={(mileage) => setSearchData(prev => ({
                                ...prev,
                                mileageFrom: mileage.from,
                                mileageTo: mileage.to
                            }))}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}