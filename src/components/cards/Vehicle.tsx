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

    const getVehicleUrl = (vehicle: IVehicle) => `/${vehicle.brandSlug}/${vehicle.modelSlug}/${vehicle.id}`;
    const formatNumber = (num: number) => num.toLocaleString("en-US").replace(/,/g, ' ');

    if (error) {
        logger.error(error);
    }

    return (
        <Link href={getVehicleUrl(vehicle)}>
            <Card className="w-96 h-[13rem] relative hover:cursor-pointer duration-200 hover:scale-110 hover:shadow-[0_3px_10px_#1d4ed8]">
                <div className="absolute w-full h-full">
                    <LazyImage
                        src={images[0]?.imageUrl}
                        alt={`${vehicle.brandName} ${vehicle.modelName}`}
                        blurhash={images[0]?.blurhash}
                        rounded
                    />
                </div>
                <CardContent className="flex flex-col p-4 absolute w-full h-full">
                    <CardHeader className="flex flex-row items-center space-y-0 justify-between p-0 text-md font-bold">
                        <p className="text-lg text-white">{`${vehicle.brandName} ${vehicle.modelName}`}</p>

                        <span className="font-bold text-white bg-blue-600 py-0.5 px-3 rounded-lg">
                            {vehicle.basicInfo.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                        </span>
                    </CardHeader>

                    <CardDescription className="flex flex-col font-bold line-clamp-1 text-zinc-400">
                        {vehicle.modelSpec}
                    </CardDescription>

                    <CardFooter className="absolute bottom-3 flex gap-2 p-0 text-sm text-white">
                        <span>{vehicle.basicInfo.year}</span>
                        <span>{dictionary.vehicles.fuelTypes[vehicle.technicalInfo.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]}</span>
                        <span>{dictionary.vehicles.transmissions[vehicle.technicalInfo.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]}</span>
                        <span>{formatNumber(vehicle.basicInfo.mileage)} km</span>
                    </CardFooter>
                </CardContent>
            </Card>
        </Link>
    )
}