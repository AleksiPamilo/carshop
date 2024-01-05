import { ISearchData } from "@/components/search/SearchCar";
import type { IBrand, IModel } from "@/interfaces/vehicle";

export default function useBrandModelSelector(searchData: ISearchData, setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>) {
    const handleBrand = (value: IBrand | null) => {
        if (value !== searchData.currentBrand) {
            setSearchData(prevData => ({ ...prevData, currentBrand: value }));
        } else {
            setSearchData(prevData => ({ ...prevData, currentBrand: null }));
        }
    };

    const handleModel = (value: IModel | null) => {
        setSearchData(prevData => ({ ...prevData, currentModel: value }));
    };

    return { handleBrand, handleModel };
}