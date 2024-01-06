import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import LazyImage from "../LazyImage";
import { useEffect, useState } from "react";
import { IVehicleImage } from "../vehicle/VehicleImages";
import { type CarouselApi } from "../ui/carousel";
import ImageCarouselThumbnails from "./ImageCarouselThumbnails";
import ImageCarouselDots from "./ImageCarouselDots";

export default function ImageCarousel({ images, loop, thumbnails }: {
    images: IVehicleImage[],
    loop?: boolean,
    thumbnails?: boolean,
}) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <Carousel className="w-full relative" setApi={setApi} opts={{ loop: loop ?? false }}>
            <div className="relative">
                <CarouselContent>
                    {
                        images.map((image, index) => {
                            return (
                                <CarouselItem key={index} className="w-full h-[25rem] relative rounded-md">
                                    <LazyImage
                                        src={image.imageUrl}
                                        blurhash={image.blurhash}
                                        alt={String(index)}
                                    />
                                </CarouselItem>
                            );
                        })
                    }
                </CarouselContent>
                <CarouselPrevious className="z-30 absolute left-1 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="z-30 absolute right-1 top-1/2 transform -translate-y-1/2" />
                {!thumbnails && <ImageCarouselDots {...{ api, images, current }} />}

            </div>

            {thumbnails && images.length > 1 && <ImageCarouselThumbnails
                images={images}
                imageCarouselApi={api}
                currentImage={current}
            />}
        </Carousel>
    )
}