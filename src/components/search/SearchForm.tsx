import { IBrand, IModel } from "@/interfaces/vehicle";
import { ISearchData } from "./SearchCar";
import BrandDropdown from "../dropdowns/BrandDropdown";
import ModelDropdown from "../dropdowns/ModelDropdown";
import FuelTypeDropdown from "../dropdowns/FuelTypeDropdown";
import SearchCarDialog from "./SearchCarDialog";

type SearchFormProps = {
    brands: IBrand[],
    models: IModel[],
    handleBrand: (brand: IBrand | null) => void,
    handleModel: (model: IModel | null) => void,
    searchData: ISearchData,
    setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>,
}

export default function SearchForm({ brands, models, handleBrand, handleModel, searchData, setSearchData }: SearchFormProps) {
    return (
        <div className="flex items-center gap-1 pr-1.5">
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

            <SearchCarDialog
                {...{ searchData, setSearchData }}
            />
        </div>
    );
}