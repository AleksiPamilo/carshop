import { IVehicle } from "@/interfaces/vehicle";

export default function VehicleDetails({ vehicle }: { vehicle: IVehicle | null }) {
    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{vehicle.brand} {vehicle.model}</h1>
        </div>
    );
};