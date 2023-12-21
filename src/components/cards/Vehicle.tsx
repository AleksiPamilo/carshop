import React from "react";
import logo from "@/assets/logo.svg";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";
import { useRouter } from "next/navigation";

export default function VehicleCard({ vehicle }: {
    vehicle: IVehicle,
}) {
    const dictionary = useDictionary();
    const router = useRouter();

    return (
        <Card className="w-80 h-[30rem] relative hover:cursor-pointer" onClick={() => {
            router.push(`/${vehicle.brand}/${vehicle.model}/${vehicle.id}`)
        }}>
            <div className="w-full h-2/5 relative flex items-center mb-6">
                <img
                    className="object-cover w-full h-full rounded-t-lg"
                    src={vehicle.images?.[0] ?? logo.src}
                    alt={vehicle.model}
                />
                <span id="tag" className="absolute bottom-0 left-4 font-bold text-white bg-blue-600 py-0.5 px-3 rounded-lg transform translate-y-1/2">
                    {/* {dictionary.vehicles.fuelTypes[vehicle.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]} */}
                    {vehicle.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                </span>
            </div>

            <CardContent className="flex flex-col gap-y-2">
                <CardHeader className="p-0 text-xl font-bold">
                    {`${vehicle.year} - ${vehicle.brand} ${vehicle.model}`}
                </CardHeader>

                <CardDescription className="flex flex-col font-bold gap-1 mt-4 line-clamp-6">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima aperiam laboriosam, rerum sequi accusamus, ipsam dolor, dolore amet totam neque saepe tempora nisi id aspernatur tempore ex cupiditate officiis. Tempora.
                </CardDescription>

                <CardDescription className="absolute bottom-4 flex gap-2">
                    <span>{dictionary.vehicles.fuelTypes[vehicle.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]}</span>
                    <span>{dictionary.vehicles.transmissions[vehicle.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]}</span>
                    <span>{vehicle.odometer.toLocaleString("en-US").replace(/,/g, ' ')} km</span>
                </CardDescription>
            </CardContent>
        </Card>
    )
}