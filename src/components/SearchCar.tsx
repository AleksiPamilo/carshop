"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "./ui/button";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDictionary } from "@/hooks";
import BrandDropdown from "./dropdowns/BrandDropdown";
import ModelDropdown from "./dropdowns/ModelDropdown";
import FuelTypeDropdown from "./dropdowns/FuelTypeDropdown";
import YearDropdown from "./dropdowns/YearDropdown";
import type { IBrand, IModel } from "@/interfaces/vehicle";
import SearchCarDialog from "./SearchCarDialog";

export type QueryParams = {
    minYear: string | null,
    maxYear: string | null,
    fuelType: string | null,
};

export type ISearchData = {
    currentBrand: IBrand | null,
    currentModel: IModel | null,
} & QueryParams;

export default function SearchCar() {
    const dictionary = useDictionary();
    const router = useRouter();
    const pathname = usePathname();

    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);
    const [searchData, setSearchData] = useState<ISearchData>({
        currentBrand: null,
        currentModel: null,
        minYear: useSearchParams().get("minYear"),
        maxYear: useSearchParams().get("maxYear"),
        fuelType: useSearchParams().get("fuelType"),
    });

    useEffect(() => {
        fetch("/api/vehicles/brands")
            .then((res) => res.json())
            .then((json) => setBrands(json.data));
    }, []);

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
    }, [brands, models, searchData?.currentBrand, searchData?.currentModel, pathname]);

    useEffect(() => {
        if (searchData.currentBrand) {
            fetch(`/api/vehicles/models?brand_id=${searchData.currentBrand.id}`)
                .then((res) => res.json())
                .then((json) => setModels(json.data));
        }
    }, [searchData.currentBrand]);

    const handleBrand = (value: IBrand | null) => {
        if (value !== searchData.currentBrand) {
            setSearchData(prev => ({
                ...prev,
                currentBrand: value,
                currentModel: null
            }));
        } else {
            setSearchData(prev => ({ ...prev, currentBrand: value }));
        }
    };

    const handleModel = (value: IModel | null) => {
        setSearchData(prev => ({ ...prev, currentModel: value }));
    };

    return (
        <div className="flex sticky z-40 top-2 w-full items-center justify-center max-sm:pt-24">
            <SearchCarDialog {...{ brands, models, handleBrand, handleModel, searchData, setSearchData }} />
            <div className="w-3/5 h-full p-4 rounded-md shadow-md hidden md:flex flex-wrap md:flex-nowrap gap-3 md:gap-0 items-center justify-between bg-zinc-50 dark:bg-zinc-900">
                <div className="flex flex-wrap gap-3">
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
                </div>

                <Button className="text-right max-md:w-full" onClick={() => {
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
        return router.replace("/cars" + (nonEmptyParams ? `?${nonEmptyParams}` : ""));
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