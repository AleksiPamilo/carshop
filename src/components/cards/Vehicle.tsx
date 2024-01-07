import React from "react";
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
import { IVehicleImage } from "../vehicle/VehicleImages";
import LazyImage from "../LazyImage";
import { useCachedData } from "@/hooks";
import logger from "@/utils/logger";

export default function VehicleCard({ vehicle }: {
    vehicle: IVehicle,
}) {
    const dictionary = useDictionary();
    const [images, error] = useCachedData<IVehicleImage>(`vehicleImages-${vehicle.id}`, `/api/images/get?vehicleId=${vehicle.id}`, vehicle.id);

    if (error) {
        logger.error(error);
    }

    return (
        <Link href={`/${vehicle.brandSlug}/${vehicle.modelSlug}/${vehicle.id}`}>
            <Card className="w-80 h-[30rem] relative hover:cursor-pointer">
                <div className="w-full h-2/5 relative flex items-center mb-6">
                    <LazyImage
                        src={images[0]?.imageUrl}
                        alt={`${vehicle.brandName} ${vehicle.modelName}`}
                        blurhash={images[0]?.blurhash}
                        rounded="rounded-t-md"
                    />
                    <span id="tag" className="absolute bottom-0 left-4 font-bold text-white bg-blue-600 py-0.5 px-3 rounded-lg transform translate-y-1/2">
                        {vehicle.basicInfo.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                    </span>
                </div>

                <CardContent className="flex flex-col gap-y-2">
                    <CardHeader className="p-0 text-md font-bold">
                        {`${vehicle.brandName} ${vehicle.modelName}`}
                    </CardHeader>

                    <CardDescription className="flex flex-col font-bold gap-1 mt-4 line-clamp-6">
                        {vehicle.modelSpec}
                    </CardDescription>

                    <CardFooter className="absolute bottom-4 flex gap-2 p-0 text-sm text-zinc-500">
                        <span>{vehicle.basicInfo.year}</span>
                        <span>{dictionary.vehicles.fuelTypes[vehicle.technicalInfo.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]}</span>
                        <span>{dictionary.vehicles.transmissions[vehicle.technicalInfo.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]}</span>
                        <span>{vehicle.basicInfo.mileage.toLocaleString("en-US").replace(/,/g, ' ')} km</span>
                    </CardFooter>
                </CardContent>
            </Card>
        </Link>
    )
}