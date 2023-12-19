"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDictionary } from "@/hooks";
import DoubleDropdown from "./DoubleDropdown";

interface IBrand {
    id: number,
    name: string,
    models: IModel[],
}

interface IModel {
    id: number,
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
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 2 }, (_, i) => 1900 + i).reverse();

    useEffect(() => {
        fetch("/api/vehicles/brands")
            .then((res) => res.json())
            .then((json) => setBrands(json.data));
    }, [])

    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);
    const [currentModel, setCurrentModel] = useState<IModel | null>(null);
    const [fuelType, setFuelType] = useState<string | null>(null);
    const [minYear, setMinYear] = useState<string | null>(null);
    const [maxYear, setMaxYear] = useState<string | null>(null);

    useEffect(() => {
        if (currentBrand) {
            fetch(`/api/vehicles/models?brand_id=${currentBrand.id}`)
                .then((res) => res.json())
                .then((json) => setModels(json.data));
        }
    }, [currentBrand]);

    const handleMake = (value: IBrand) => {
        setCurrentBrand(value); setCurrentModel(null);
    };

    const handleModel = (value: IModel | null) => {
        setCurrentModel(value);
    };

    return (
        <div className="flex sticky z-40 top-2 w-full items-center justify-center">
            <div className="w-3/5 h-full bg-zinc-800 p-4 rounded-md shadow-md flex justify-between">
                <div className="flex gap-3">
                    <Dropdown label={dictionary.vehicles.brand} selected={currentBrand?.name} options={
                        brands.map((brand) => ({
                            label: brand.name,
                            onClick: () => handleMake(brand),
                        }))
                    } />

                    <Dropdown label={dictionary.vehicles.model} disabled={!currentBrand} selected={currentModel?.name} options={
                        models.map((brand) => ({
                            label: brand.name,
                            onClick: () => handleModel(brand),
                        }))
                    } />

                    <Dropdown label={dictionary.vehicles.fuelType} selected={fuelType} options={
                        Object.entries(dictionary.vehicles.fuelTypes).map(([_, value]) => ({
                            label: value,
                            onClick: () => setFuelType(value),
                        }))
                    } />

                    <DoubleDropdown label={[dictionary.common.min, dictionary.common.max]} selected={[minYear ?? "", maxYear ?? ""]}
                        options={[
                            years.map((year) => ({
                                label: year.toString(),
                                onClick: () => setMinYear(year.toString()),
                            })),
                            years.map((year) => ({
                                label: year.toString(),
                                onClick: () => setMaxYear(year.toString()),
                            })),
                        ]} />
                </div>

                <Button onClick={() => {
                    if (!currentBrand) {
                        return toast.warning(dictionary.vehicles.errors.brand)
                    }

                    const queryParams: QueryParams = {
                        minYear: minYear,
                        maxYear: maxYear,
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
    let path = `/${currentBrand.name}`;

    if (currentModel?.name) {
        path += `/${currentModel?.name}`;
    }

    const nonEmptyParams = Object.entries(queryParams)
        .filter(([_, value]) => value !== "" && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    if (nonEmptyParams) {
        path += `?${nonEmptyParams}`;
    }

    // TODO: Fix this
    router.push(path)
}