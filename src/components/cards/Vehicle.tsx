import React, { useEffect } from "react";
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
import Link from "next/link";
import { IVehicleImage } from "../VehicleDetails";
import LazyImage from "../LazyImage";

export default function VehicleCard({ vehicle }: {
    vehicle: IVehicle,
}) {
    const [image, setImage] = React.useState<IVehicleImage>();
    const dictionary = useDictionary();

    useEffect(() => {
        const fetchImage = async () => {
            if (!vehicle) {
                return;
            }

            const response = await fetch("/api/images/get?amount=1&vehicleId=" + vehicle.id);
            const json = await response.json();

            setImage(json.images[0]);
        };

        fetchImage();
    }, [vehicle]);

    return (
        <Link href={`/${vehicle.brandSlug}/${vehicle.modelSlug}/${vehicle.id}`}>
            <Card className="w-80 h-[30rem] relative hover:cursor-pointer">
                <div className="w-full h-2/5 relative flex items-center mb-6">
                    <LazyImage
                        src={image?.imageUrl ?? logo.src}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        blurhash={image?.blurhash}
                    />
                    <span id="tag" className="absolute bottom-0 left-4 font-bold text-white bg-blue-600 py-0.5 px-3 rounded-lg transform translate-y-1/2">
                        {vehicle.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                    </span>
                </div>

                <CardContent className="flex flex-col gap-y-2">
                    <CardHeader className="p-0 text-md font-bold">
                        {`${vehicle.brand} ${vehicle.model}`}
                    </CardHeader>

                    <CardDescription className="flex flex-col font-bold gap-1 mt-4 line-clamp-6">
                        {vehicle.modelSpec}
                    </CardDescription>

                    <CardFooter className="absolute bottom-4 flex gap-2 p-0 text-sm text-zinc-500">
                        <span>{vehicle.year}</span>
                        <span>{dictionary.vehicles.fuelTypes[vehicle.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]}</span>
                        <span>{dictionary.vehicles.transmissions[vehicle.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]}</span>
                        <span>{vehicle.mileage.toLocaleString("en-US").replace(/,/g, ' ')} km</span>
                    </CardFooter>
                </CardContent>
            </Card>
        </Link>
    )
}