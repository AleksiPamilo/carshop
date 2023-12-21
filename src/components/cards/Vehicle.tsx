import React from "react";
import logo from "@/assets/logo.svg";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";

export default function VehicleCard({ vehicle }: {
    vehicle: IVehicle,
}) {
    const dictionary = useDictionary();

    return (
        <Card className="w-80 h-[30rem] relative">
            <div className="w-full h-2/5 relative flex items-center mb-6">
                <img
                    className="object-cover w-full h-full rounded-t-lg bg-zinc-900"
                    src={vehicle.images?.[0] ?? logo.src}
                    alt={vehicle.model}
                />
                <span id="tag" className="absolute bottom-0 left-4 bg-blue-600 py-0.5 px-3 rounded-lg transform translate-y-1/2">
                    {dictionary.vehicles.fuelTypes[vehicle.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]}
                </span>
            </div>

            <CardContent className="flex flex-col gap-y-2">
                <CardHeader className="p-0 text-xl font-bold">
                    {`${vehicle.year} - ${vehicle.brand} ${vehicle.model}`}
                </CardHeader>
                <CardDescription className="flex font-bold gap-1">
                    <span className="text-white">
                        {vehicle.odometer.toLocaleString("en-US").replace(/,/g, ' ')} km
                    </span>
                </CardDescription>
            </CardContent>
            <CardFooter className="absolute bottom-0 text-blue-600">
                {vehicle.price.toLocaleString("en-US").replace(/,/g, ' ')}€
            </CardFooter>
        </Card>
    )
}