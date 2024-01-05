import type { IBrand, IModel } from "@/interfaces/vehicle";
import { useState } from "react";

export default function useBrandModelSelector() {
    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);
    const [currentModel, setCurrentModel] = useState<IModel | null>(null);

    const handleBrand = (value: IBrand | null) => {
        if (value !== currentBrand) {
            setCurrentBrand(value);
        } else {
            setCurrentBrand(null);
        }
    };

    const handleModel = (value: IModel | null) => {
        setCurrentModel(value);
    };

    return { currentBrand, currentModel, handleBrand, handleModel };
}