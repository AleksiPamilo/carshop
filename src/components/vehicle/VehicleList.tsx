import { IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";
import VehicleCard from "../cards/Vehicle";

export default function VehicleList({ vehicles }: { vehicles: IVehicle[] }) {
    const dictionary = useDictionary();

    return (
        <div className="flex flex-wrap items-center gap-12 justify-center mt-12">
            {vehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} {...{ vehicle, dictionary }} />
            ))}
        </div>
    )
}