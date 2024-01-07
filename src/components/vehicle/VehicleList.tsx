import { IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";
import VehicleCard from "../cards/Vehicle";
import { useRouter } from "next/navigation";
import VehiclePagination from "./VehiclePagination";

export default function VehicleList({ vehicles, pageAmount, page }: {
    vehicles: IVehicle[],
    pageAmount?: number,
    page: number,
}) {
    const dictionary = useDictionary();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center gap-6 max-md:pb-8">
            <div className="flex flex-wrap items-center gap-12 justify-center md:mt-12">
                {vehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} {...{ vehicle, dictionary }} />
                ))}
            </div>

            {pageAmount && pageAmount > 1 &&
                <VehiclePagination {...{ page, pageAmount, router }} />
            }
        </div>
    )
}