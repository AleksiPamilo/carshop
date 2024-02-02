import { IVehicle } from "@/interfaces/vehicle";
import VehicleDetailsList from "./VehicleDetailsList";
import { Button } from "../ui/button";
import { useDictionary } from "../context/DictionaryProvider";
import { toast } from "sonner";

// TODO: Add contact seller functionality
export default function VehicleInfo({ vehicle }: { vehicle: IVehicle }) {
    const dictionary = useDictionary();

    return (
        <div className="w-full lg:w-[30rem] h-full lg:ml-4 flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{vehicle.brandName} {vehicle.modelName}</h1>
                <span className="text-xl font-bold text-blue-600">
                    {vehicle.basicInfo.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                </span>
            </div>

            <h4 className="text-sm text-zinc-500">{vehicle.modelSpec}</h4>
            <VehicleDetailsList vehicle={vehicle} />
            <div>
                <Button className="w-full text-white bg-blue-600 hover:bg-blue-700" onClick={() => toast("Functionality coming soon, maybe :D")}>
                    {dictionary.vehicles.contactSeller}
                </Button>
            </div>
        </div>
    )
}