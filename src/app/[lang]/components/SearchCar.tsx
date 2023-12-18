"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { IDictionary } from "@/interfaces/dictionary";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
    year: string | null,
    fuelType?: string | null,
};

export default function SearchCar({ dictionary }: {
    dictionary: IDictionary
}) {
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/vehicles/brands")
            .then((res) => res.json())
            .then((json) => setBrands(json.data));
    }, [])

    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);
    const [currentModel, setCurrentModel] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);

    useEffect(() => {
        if (currentBrand) {
            fetch(`/api/vehicles/models?id=${currentBrand.id}`)
                .then((res) => res.json())
                .then((json) => setModels(json.data));
        }
    }, [currentBrand]);

    const handleMake = (value: IBrand) => {
        setCurrentBrand(value); setCurrentModel(null);
    };

    const handleModel = (value: string | null) => {
        setCurrentModel(value);
    };

    // TODO: Add selections for year, price, and mileage
    return (
        <div className="flex items-center justify-center">
            <div className="w-3/5 h-full bg-zinc-800 p-4 rounded-md shadow-md flex justify-between">
                <div className="flex gap-3">
                    <Dropdown label={dictionary.vehicles.brand} selected={currentBrand?.name} options={
                        brands.map((brand) => ({
                            label: brand.name,
                            onClick: () => handleMake(brand),
                        }))
                    } />

                    <Dropdown label={dictionary.vehicles.model} disabled={!currentBrand} selected={currentModel} options={
                        models.map((brand) => ({
                            label: brand.name,
                            onClick: () => handleModel(brand.name),
                        }))
                    } />
                </div>

                <Button onClick={() => {
                    if (!currentBrand) {
                        return toast.warning(dictionary.vehicles.errors.brand)
                    }
                    const queryParams: QueryParams = {
                        year: year,
                        fuelType: null,
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
 * @param router Next.js router
 */
function searchVehicles(currentBrand: IBrand, currentModel: string | null, queryParams: QueryParams, router: AppRouterInstance) {
    let path = `/${currentBrand?.name}`;
    if (currentModel) {
        path += `/${currentModel}`;
    }

    if (queryParams.fuelType) {
        path += `/${queryParams.fuelType}`;
        delete queryParams.fuelType;
    }

    const nonEmptyParams = Object.entries(queryParams)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    if (nonEmptyParams) {
        path += `?${nonEmptyParams}`;
    }

    router.push(path);
}