import { useCachedData } from "@/hooks";
import { IVehicle } from "@/interfaces/vehicle";
import LazyImage from "../LazyImage";
import ImageCarousel from "../carousel/ImageCarousel";

export interface IVehicleImage {
    imageUrl: string,
    blurhash: string,
}

export default function VehicleImages({ vehicle }: { vehicle: IVehicle | null }) {
    const [images, error] = useCachedData<IVehicleImage>(vehicle ? `vehicleImages-${vehicle.id}` : "", vehicle ? `/api/images/get?vehicleId=${vehicle.id}` : "");

    return (
        <div className="w-full select-none">
            {images.length > 0
                ? (images.length === 1
                    ? <LazyImage src={images[0].imageUrl} blurhash={images[0].blurhash} alt={"vehicle-" + images[0].blurhash} />
                    : <ImageCarousel {...{ images }} thumbnails loop />)
                : <div className="w-full h-0 pb-[5rem] lg:pb-[30rem] relative rounded-lg flex items-center justify-center text-gray-500 bg-zinc-100 dark:bg-zinc-900">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        {error
                            ? "Failed to load images. Please try again later."
                            : "Images are loading... If they don't load, please try again later."
                        }
                    </div>
                </div>
            }
        </div>
    )
}