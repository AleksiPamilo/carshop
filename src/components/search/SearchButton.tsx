import { Button } from "../ui/button";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
    type ISearchData,
    type QueryParams,
    searchVehicles,
} from "./SearchCar";
import { useDictionary } from "../context/DictionaryProvider";

export default function SearchButton({ searchData, queryParams, router }: {
    searchData: ISearchData,
    queryParams: QueryParams,
    router: AppRouterInstance,
}) {
    const dictionary = useDictionary();

    return (
        <Button className="text-right max-md:w-full" onClick={() => {
            searchVehicles(
                searchData.currentBrand,
                searchData.currentModel,
                queryParams,
                router
            );
        }} >
            {dictionary.vehicles.search}
        </Button>
    )
}