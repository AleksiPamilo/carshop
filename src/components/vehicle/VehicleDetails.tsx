import { IVehicle } from "@/interfaces/vehicle";
import VehicleImages from "./VehicleImages";
import VehicleDescription from "./VehicleDescription";
import VehicleFeatures from "./VehicleFeatures";
import VehicleInfo from "./VehicleInfo";

export default function VehicleDetails({ vehicle }: { vehicle: IVehicle | null }) {
    if (!vehicle) return (
        <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            TODO: 404 - Page/Component
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center mt-16 px-4 gap-y-4 mb-8">
            <div className="w-full lg:w-[65%]">
                <div className="flex flex-col lg:flex-row items-start justify-center gap-x-4 gap-y-8 w-full">
                    <VehicleImages vehicle={vehicle} />
                    <VehicleInfo vehicle={vehicle} />
                </div>
                <div className="flex flex-col items-center justify-center gap-y-8 w-full">
                    <VehicleDescription vehicle={vehicle} />
                    <VehicleFeatures vehicle={vehicle} />
                </div>
            </div>
        </div>
    );
};