import { IVehicle } from "@/interfaces/vehicle";
import { useEffect, useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import { useDictionary } from "../context/DictionaryProvider";
import VehicleDetail from "./VehicleDetail";
import LazyImage from "../LazyImage";

export interface IVehicleImage {
    imageUrl: string,
    blurhash: string,
}

export default function VehicleDetails({ vehicle }: { vehicle: IVehicle | null }) {
    const [images, setImages] = useState<IVehicleImage[]>([]);
    const dictionary = useDictionary();

    useEffect(() => {
        const fetchImage = async () => {
            if (!vehicle) {
                return;
            }

            const response = await fetch("/api/images/get?vehicleId=" + vehicle.id);
            const json = await response.json();

            setImages(json.images);
        };

        fetchImage();
    }, [vehicle]);

    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-12 px-4">
            <div>
                <div className="flex flex-col sm:flex-row items-stretch gap-x-4 gap-y-8">
                    <div className="max-w-[50rem] select-none">
                        {images.length > 0 && images.length === 1
                            ? <LazyImage src={images[0].imageUrl} blurhash={images[0].blurhash} alt="" />
                            : <ImageCarousel {...{ images }} thumbnails loop />
                        }
                    </div>
                    <div className="w-full md:w-[20rem] h-full md:ml-4 flex flex-col gap-y-4 p-4">
                        <h1 className="text-xl font-bold">{vehicle.brand} {vehicle.model}</h1>
                        <h4 className="text-sm text-zinc-500">{vehicle.modelSpec}</h4>

                        <div className="flex flex-col gap-2 mt-4">
                            <VehicleDetail label={dictionary.vehicles.year} value={vehicle.year} separator />
                            <VehicleDetail label={dictionary.vehicles.mileage} value={`${vehicle.mileage.toLocaleString("en-US").replace(/,/g, ' ')} km`} separator />
                            <VehicleDetail label={dictionary.vehicles.fuelType} value={dictionary.vehicles.fuelTypes[vehicle.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]} separator />
                            <VehicleDetail label={dictionary.vehicles.transmission} value={dictionary.vehicles.transmissions[vehicle.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]} separator />
                            <VehicleDetail label={dictionary.vehicles.drivetrain} value={dictionary.vehicles.drivetrains[vehicle.drivetrain.toLowerCase() as keyof typeof dictionary.vehicles.drivetrains]} separator />
                            <VehicleDetail label={dictionary.vehicles.powerHp} value={`${vehicle.power}`} separator />
                            <VehicleDetail label={dictionary.vehicles.licensePlate} value={vehicle.licensePlate} separator />
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <span className="
                                text-2xl font-bold
                                text-blue-600
                            ">
                                {vehicle.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    TODO: Varustetiedot:
                </div>
            </div>
        </div>
    );
};