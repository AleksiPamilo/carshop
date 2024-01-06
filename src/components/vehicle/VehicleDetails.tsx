import { IVehicle } from "@/interfaces/vehicle";
import ImageCarousel from "../carousel/ImageCarousel";
import { useDictionary } from "../context/DictionaryProvider";
import VehicleDetail from "./VehicleDetail";
import LazyImage from "../LazyImage";
import { useCachedData } from "@/hooks";

export interface IVehicleImage {
    imageUrl: string,
    blurhash: string,
}

export default function VehicleDetails({ vehicle }: { vehicle: IVehicle | null }) {
    const dictionary = useDictionary();
    const [images, error] = useCachedData<IVehicleImage>(vehicle ? `vehicleImages-${vehicle.id}` : "", vehicle ? `/api/images/get?vehicleId=${vehicle.id}` : "");

    if (!vehicle) return (
        <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            TODO: 404 - Page/Component
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center mt-12 px-4">
            <div>
                <div className="flex flex-col md:flex-row items-stretch gap-x-4 gap-y-8 max-md:mt-12">
                    <div className="w-[90vw] md:w-[25rem] lg:w-[40rem] xl:w-[50rem] select-none">
                        {images.length > 0
                            ? (images.length === 1
                                ? <LazyImage src={images[0].imageUrl} blurhash={images[0].blurhash} alt={"vehicle-" + images[0].blurhash} />
                                : <ImageCarousel {...{ images }} thumbnails loop />)
                            : <div className="w-full h-full rounded-lg p-4 flex items-center justify-center text-gray-500 bg-zinc-100 dark:bg-zinc-900">
                                {error
                                    ? "Failed to load images. Please try again later."
                                    : "Images are loading..."
                                }
                            </div>
                        }
                    </div>
                    <div className="w-full md:w-[20rem] h-full md:ml-4 flex flex-col gap-y-4 py-4">
                        <h1 className="text-xl font-bold">{vehicle.brandName} {vehicle.modelName}</h1>
                        <h4 className="text-sm text-zinc-500">{vehicle.modelSpec}</h4>

                        <div className="flex flex-col gap-2 mt-4">
                            <VehicleDetail label={dictionary.vehicles.year} value={vehicle.basicInfo.year} separator />
                            <VehicleDetail label={dictionary.vehicles.mileage} value={`${vehicle.basicInfo.mileage.toLocaleString().replace(/,/g, ' ')} km`} separator />
                            <VehicleDetail label={dictionary.vehicles.fuelType} value={dictionary.vehicles.fuelTypes[vehicle.technicalInfo.fuelType.toLowerCase() as keyof typeof dictionary.vehicles.fuelTypes]} separator />
                            <VehicleDetail label={dictionary.vehicles.transmission} value={dictionary.vehicles.transmissions[vehicle.technicalInfo.transmission.toLowerCase() as keyof typeof dictionary.vehicles.transmissions]} separator />
                            <VehicleDetail label={dictionary.vehicles.drivetrain} value={dictionary.vehicles.drivetrains[vehicle.technicalInfo.drivetrain.toLowerCase() as keyof typeof dictionary.vehicles.drivetrains]} separator />
                            <VehicleDetail label={dictionary.vehicles.powerHp} value={`${vehicle.technicalInfo.power}`} separator />
                            <VehicleDetail label={dictionary.vehicles.licensePlate} value={vehicle.basicInfo.licensePlate} separator />
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-2xl font-bold text-blue-600">
                                {vehicle.basicInfo.price.toLocaleString("en-US").replace(/,/g, ' ')}€
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="mt-4">{vehicle.basicInfo.description}</p>

                    todo: information about vehicle
                </div>
            </div>
        </div>
    );
};