import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useDictionary } from "./context/DictionaryProvider";
import { ISearchData, QueryParams, searchVehicles } from "./SearchCar";
import { IBrand, IModel } from "@/interfaces/vehicle";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import YearDropdown from "./dropdowns/YearDropdown";
import FuelTypeDropdown from "./dropdowns/FuelTypeDropdown";
import ModelDropdown from "./dropdowns/ModelDropdown";
import BrandDropdown from "./dropdowns/BrandDropdown";

type SearchCarDialogProps = {
    brands: IBrand[],
    models: IModel[],
    handleBrand: (brand: IBrand | null) => void,
    handleModel: (model: IModel | null) => void,
    searchData: ISearchData,
    setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>
}

export default function SearchCarDialog({
    brands,
    models,
    handleBrand,
    handleModel,
    searchData,
    setSearchData
}: SearchCarDialogProps) {
    const dictionary = useDictionary();
    const router = useRouter();

    return (
        <div className="flex md:hidden fixed bottom-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        {dictionary.vehicles.search}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="md:hidden flex flex-col">
                    <div className="flex items-center gap-3 py-2 px-3">
                        <SearchIcon className="w-6 h-6" />
                        <span>
                            {dictionary.vehicles.search}
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-2 mt-3">
                        <BrandDropdown
                            brands={brands}
                            onChange={handleBrand}
                            selected={searchData.currentBrand?.slug ?? null}
                        />

                        <ModelDropdown
                            models={models}
                            onChange={handleModel}
                            selected={searchData.currentModel?.slug ?? null}
                            disabled={!searchData.currentBrand}
                        />

                        <FuelTypeDropdown
                            fuelType={searchData.fuelType}
                            onChange={(v) => {
                                const value = v === "unselected" ? null : v;
                                setSearchData(prev => ({ ...prev, fuelType: value }));
                            }}
                        />

                        <YearDropdown
                            min={searchData.minYear}
                            max={searchData.maxYear}
                            onChange={(years) => setSearchData(prev => ({
                                ...prev,
                                minYear: years.min,
                                maxYear: years.max
                            }))}
                        />

                        <Button className="w-full" onClick={() => {
                            if (!searchData.currentBrand) {
                                router.replace("/cars");
                                return;
                            }

                            const fuelTypeKey = Object.entries(dictionary.vehicles.fuelTypes)
                                .find(([_, value]) => value === searchData.fuelType)?.[0];

                            const queryParams: QueryParams = {
                                minYear: searchData.minYear,
                                maxYear: searchData.maxYear,
                                fuelType: fuelTypeKey ?? null,
                            };

                            searchVehicles(
                                searchData.currentBrand,
                                searchData.currentModel,
                                queryParams,
                                router
                            );
                        }} >
                            {dictionary.vehicles.search}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}