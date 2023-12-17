"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { IDictionary } from "@/interfaces/dictionary";

interface IBrand {
    id: number,
    name: string,
    models: IModel[],
}

interface IModel {
    id: number,
    name: string,
}

export default function SearchCar({
    dictionary,
}: {
    dictionary: IDictionary
}) {
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);

    useEffect(() => {
        fetch("/api/vehicles/brands")
            .then((res) => res.json())
            .then((json) => setBrands(json.data));
    }, [])

    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);
    const [currentModel, setCurrentModel] = useState<string | null>(null);

    useEffect(() => {
        if (currentBrand) {
            fetch(`/api/vehicles/models/${currentBrand.id}`)
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
                    <Dropdown label={dictionary.vehicles.make} selected={currentBrand?.name} options={
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

                <Button onClick={() => { }} >
                    {dictionary.vehicles.search}
                </Button>
            </div>
        </div>
    );
};