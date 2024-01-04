import { IVehicleImage } from "../vehicle/VehicleDetails";
import type { CarouselApi } from "../ui/carousel";

export default function ImageCarouselDots({ images, api, current }: {
    images: IVehicleImage[],
    api: CarouselApi,
    current: number,
}) {
    return (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 mt-2">
            {images.map((_, index) => (
                <button
                    key={index}
                    className={`relative w-6 h-1 rounded-md ${index === current ? "bg-gradient-to-r from-pink-200 to-blue-600 bg-blue-100" : "bg-zinc-600"}`}
                    onClick={() => api?.scrollTo(index)}
                >
                </button>
            ))}
        </div>
    )
}