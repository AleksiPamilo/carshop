"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDictionary, useCachedData, useBrandModelSelector } from "@/hooks";
import type { IBrand, IModel } from "@/interfaces/vehicle";
import SearchCarMobile from "./SearchCarMobile";
import SearchForm from "./SearchForm";
import SearchButton from "./SearchButton";

export type QueryParams = {
    minYear: string | null,
    maxYear: string | null,
    fuelType: string | null,
    priceFrom: string | null,
    priceTo: string | null,
    mileageFrom: string | null,
    mileageTo: string | null,
};

export type ISearchData = {
    currentBrand: IBrand | null,
    currentModel: IModel | null,
} & QueryParams;

export default function SearchCar() {
    const dictionary = useDictionary();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchData, setSearchData] = useState<ISearchData>({
        currentBrand: null, currentModel: null,
        minYear: searchParams.get("minYear"),
        maxYear: searchParams.get("maxYear"),
        fuelType: searchParams.get("fuelType"),
        priceFrom: searchParams.get("priceFrom"),
        priceTo: searchParams.get("priceTo"),
        mileageFrom: searchParams.get("mileageFrom"),
        mileageTo: searchParams.get("mileageTo"),
    });
    const { handleBrand, handleModel } = useBrandModelSelector(searchData, setSearchData);

    // TODO: Handle errors
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const [brands, brandError] = useCachedData<IBrand>("brands", apiUrl + "/vehicles/brands");
    const [models, modelError] = useCachedData<IModel>(`models-${searchData.currentBrand?.id}`, `/api/vehicles/models?brand_id=${searchData.currentBrand?.id}`, searchData.currentBrand?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!searchData?.currentBrand && !searchData?.currentModel) {
            const path = pathname.split("/");
            const brand = brands?.find((brand) => brand.slug === path[2]) ?? null;
            const model = models?.find((model) => model.slug === path[3]) ?? null;

            setSearchData(prev => ({
                ...prev,
                currentBrand: brand,
                currentModel: model
            }));
        }
    }, [brands, models, pathname]);

    const fuelTypeKey = Object.entries(dictionary.vehicles.fuelTypes)
        .find(([_, value]) => value === searchData.fuelType)?.[0];

    const queryParams: QueryParams = {
        minYear: searchData.minYear,
        maxYear: searchData.maxYear,
        fuelType: fuelTypeKey ?? null,
        priceFrom: searchData.priceFrom,
        priceTo: searchData.priceTo,
        mileageFrom: searchData.mileageFrom,
        mileageTo: searchData.mileageTo,
    };

    return (
        <div className="flex sticky z-40 top-2 w-full items-center justify-center max-sm:pt-24">
            <SearchCarMobile {...{
                brands,
                models,
                handleBrand,
                handleModel,
                searchData,
                setSearchData,
                queryParams
            }} />

            <div className="w-max md:w-[90%] lg:w-4/5 xl:w-3/5 h-full p-4 rounded-md shadow-md hidden md:flex flex-wrap md:flex-nowrap gap-3 md:gap-0 items-center justify-between bg-zinc-50 dark:bg-zinc-900">
                <SearchForm {...{
                    brands,
                    models,
                    searchData,
                    setSearchData
                }} />

                <SearchButton {...{
                    searchData,
                    queryParams,
                    router
                }} />
            </div>
        </div>
    );
};

/**
 * This function sets the query parameters and navigates to the search page.
 * @param currentBrand Currently selected brand
 * @param currentModel Currently selected model
 * @param queryParams Query parameters
 * @param router Next.js app router
 */
export function searchVehicles(currentBrand: IBrand | null, currentModel: IModel | null, queryParams: QueryParams, router: AppRouterInstance) {
    const nonEmptyParams = Object.entries(queryParams)
        .filter(([_, value]) => value !== "" && value !== null)
        .map(([key, value]) => value !== null ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : "")
        .join('&');

    if (!currentBrand) {
        return router.push("/cars" + (nonEmptyParams ? `?${nonEmptyParams}` : ""));
    }

    let path = `/${currentBrand.slug}`;
    if (currentModel?.name) {
        path += `/${currentModel?.slug}`;
    }

    if (nonEmptyParams) {
        path += `?${nonEmptyParams}`;
    }

    router.push(path);
}