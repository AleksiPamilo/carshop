import { IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";
import VehicleDetail from "./VehicleDetail";

export default function VehicleDetailsList({ vehicle }: { vehicle: IVehicle }) {
    const dictionary = useDictionary();
    const { basicInfo, technicalInfo } = vehicle;
    const { engineSize, fuelType } = technicalInfo;
    const fuelTypeText = dictionary.vehicles.fuelTypes[fuelType?.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes];

    const engine = engineSize
        ? `${engineSize.toFixed(1)}, ${fuelTypeText}`
        : fuelTypeText;

    return (
        <div className="flex flex-col gap-3.5 mt-4">
            <VehicleDetail label={dictionary.vehicles.year} value={basicInfo.year} separator />
            <VehicleDetail label={dictionary.vehicles.engine} value={engine} separator />
            <VehicleDetail label={dictionary.vehicles.mileage} value={`${basicInfo.mileage.toLocaleString().replace(/,/g, ' ')} km`} separator />
            <VehicleDetail label={dictionary.vehicles.transmission} value={dictionary.vehicles.transmissions[technicalInfo.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]} separator />
            <VehicleDetail label={dictionary.vehicles.drivetrain} value={dictionary.vehicles.drivetrains[technicalInfo.drivetrain.toLowerCase() as keyof typeof dictionary.vehicles.drivetrains]} separator />
            <VehicleDetail label={dictionary.vehicles.licensePlate} value={basicInfo.licensePlate} />
        </div>
    );
}