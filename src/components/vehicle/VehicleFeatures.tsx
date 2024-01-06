import { IFeature, IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";

export default function VehicleFeatures({ vehicle }: { vehicle: IVehicle }) {
    const dictionary = useDictionary();

    const generateFeatures = () => {
        const features = vehicle.basicInfo.features || [];
        const categories = features.reduce((categories, feature) => {
            if (!categories[feature.category.key]) {
                categories[feature.category.key] = [];
            }
            categories[feature.category.key].push(feature);
            return categories;
        }, {} as Record<string, IFeature[]>);

        return Object.entries(categories).map(([categoryKey, features]) => (
            <div key={categoryKey}>
                <span className="font-semibold mr-1.5">{dictionary.vehicles.featureCategories[categoryKey as keyof typeof dictionary.vehicles.featureCategories]}:</span>
                <span>{features.map(feature => dictionary.vehicles.features[feature.key]).join(', ')}</span>
            </div>
        ));
    };

    return (
        <div className="w-full">
            {vehicle?.basicInfo.features && vehicle.basicInfo.features.length > 0 &&
                <div className="border p-4 rounded-lg">
                    <h1 className="font-semibold mb-2">{dictionary.common.features}</h1>
                    <div className="flex flex-col gap-2">{generateFeatures()}</div>
                </div>
            }
        </div>
    )
}