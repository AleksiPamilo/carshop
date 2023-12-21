"use client";

import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDictionary } from "@/hooks";
import BrandDropdown from "./dropdowns/BrandDropdown";
import ModelDropdown from "./dropdowns/ModelDropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import FuelTypeDropdown from "./dropdowns/FuelTypeDropdown";
import YearDropdown from "./dropdowns/YearDropdown";
// import DoubleDropdown from "./DoubleDropdown";

interface IBrand {
    id: number,
    name: string,
    slug: string,
    models: IModel[],
}

interface IModel {
    id: number,
    slug: string,
    name: string,
}

type QueryParams = {
    minYear: string | null,
    maxYear: string | null,
    fuelType?: string | null,
};

export default function SearchCar() {
    const dictionary = useDictionary();
    const router = useRouter();
    const { toast } = useToast();

    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);

    useEffect(() => {
        fetch("/api/vehicles/brands")
            .then((res) => res.json())
            .then((json) => setBrands(json.data));
    }, [])

    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);
    const [currentModel, setCurrentModel] = useState<IModel | null>(null);
    const [fuelType, setFuelType] = useState<string | null>(null);
    const [years, setYears] = useState<{ min: string | null, max: string | null }>({ min: null, max: null });

    useEffect(() => {
        if (currentBrand) {
            fetch(`/api/vehicles/models?brand_id=${currentBrand.id}`)
                .then((res) => res.json())
                .then((json) => setModels(json.data));
        }
    }, [currentBrand]);

    const handleBrand = (value: IBrand | null) => {
        setCurrentBrand(value);

        if (value !== currentBrand) {
            setCurrentModel(null);
        }
    };

    const handleModel = (value: IModel | null) => {
        setCurrentModel(value);
    };

    return (
        <div className="flex sticky z-40 top-2 w-full items-center justify-center">
            <div className="w-3/5 h-full p-4 rounded-md shadow-md flex justify-between bg-zinc-900">
                <div className="flex gap-3">
                    <BrandDropdown
                        brands={brands}
                        currentBrand={currentBrand}
                        onChange={handleBrand}
                    />

                    <ModelDropdown
                        models={models}
                        currentModel={currentModel}
                        onChange={m => handleModel(m)}
                        disabled={!currentBrand}
                    />

                    <FuelTypeDropdown
                        fuelType={fuelType}
                        onChange={(v) => {
                            const value = v === "unselected" ? null : v;
                            setFuelType(value);
                        }}
                    />

                    <YearDropdown
                        min={years.min}
                        max={years.max}
                        onChange={(v) => setYears(v)}
                    />

                    {/* <DoubleDropdown label={[dictionary.common.min, dictionary.common.max]} selected={[minYear ?? "", maxYear ?? ""]}
                        options={[
                            years.map((year) => ({
                                label: year.toString(),
                                onClick: () => setMinYear(year.toString()),
                            })),
                            years.map((year) => ({
                                label: year.toString(),
                                onClick: () => setMaxYear(year.toString()),
                            })),
                        ]} /> */}
                </div>

                <Button onClick={() => {
                    if (!currentBrand) {
                        return toast({
                            title: dictionary.common.error,
                            description: dictionary.vehicles.errors.brand,
                            duration: 5000,
                        })
                    }

                    const queryParams: QueryParams = {
                        minYear: years.min,
                        maxYear: years.max,
                        fuelType: fuelType,
                    };

                    searchVehicles(currentBrand, currentModel, queryParams, router);
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
function searchVehicles(currentBrand: IBrand, currentModel: IModel | null, queryParams: QueryParams, router: AppRouterInstance) {
    let path = `/${currentBrand.slug}`;
    if (currentModel?.name) {
        path += `/${currentModel?.slug}`;
    }

    const nonEmptyParams = Object.entries(queryParams)
        .filter(([_, value]) => value !== "" && value !== null)
        .map(([key, value]) => value !== null ? `${key}=${encodeURIComponent(value)}` : "")
        .join('&');

    if (nonEmptyParams) {
        path += `?${nonEmptyParams}`;
    }

    router.replace(path);
}