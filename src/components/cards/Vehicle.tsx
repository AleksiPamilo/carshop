import { IVehicle } from "@/interfaces/vehicle";
import logo from "@/assets/logo.svg";
import { IDictionary } from "@/interfaces/dictionary";

export default function Vehicle({ vehicle, dictionary }: {
    vehicle: IVehicle,
    dictionary?: IDictionary,
}) {

    return (
        <div className="flex flex-col w-80 h-[30rem] m-10 bg-zinc-900 rounded-lg shadow-md">
            <div className="w-full h-2/5 relative flex items-center">
                <img
                    className="object-cover w-full h-full rounded-t-lg bg-zinc-700"
                    src={vehicle.images?.[0] ?? logo.src}
                    alt={vehicle.model}
                />
                <span id="tag" className="absolute bottom-0 left-4 bg-blue-600 py-0.5 px-3 rounded-lg transform translate-y-1/2">
                    {vehicle.fuelType}
                </span>
            </div>

            <div className="flex flex-col p-4">
                <h2 className="text-2xl font-semibold text-zinc-50">{vehicle.model}</h2>
                <p className="text-lg font-medium text-zinc-50">{vehicle.brand}</p>
                <p className="text-lg font-medium text-zinc-50">{vehicle.fuelType}</p>
                <p className="text-lg font-medium text-zinc-50">{vehicle.year}</p>
                <p className="text-lg font-medium text-zinc-50">{vehicle.odometer}</p>
                <p className="text-lg font-medium text-zinc-50">{vehicle.price}</p>
            </div>
        </div >
    );
}