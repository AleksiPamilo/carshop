import LazyImage from "../LazyImage";
import { useEffect, useState } from "react";
import { IVehicleImage } from "../VehicleDetails";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"

export default function ImageCarouselThumbnails({ images, imageCarouselApi, currentImage }: {
    images: IVehicleImage[],
    imageCarouselApi: CarouselApi,
    currentImage: number,
}) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
        setCurrent(currentImage);
        api?.scrollTo(currentImage);
    }, [currentImage, api]);

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const getBasisClass = (length: number) => {
        switch (length) {
            case 2:
                return "basis-1/2";
            case 3:
                return "basis-1/3";
            case 4:
                return "basis-1/4";
            default:
                return "basis-1/5";
        }
    }

    return (
        <Carousel className="mt-2" opts={{ dragFree: true }} setApi={setApi}>
            <CarouselContent>
                {
                    images.map((image, index) => {
                        return (
                            <CarouselItem key={index} className={`h-32 ${getBasisClass(images.length)}`}>
                                <button className={`w-full h-full relative ${index === current ? "opacity-100" : "opacity-40"}`}
                                    onClick={() => {
                                        imageCarouselApi?.scrollTo(index);
                                        api?.scrollTo(index);
                                        setCurrent(index);
                                    }}>
                                    <LazyImage
                                        src={image.imageUrl}
                                        blurhash={image.blurhash}
                                        alt={image.blurhash}
                                    />
                                </button>
                            </CarouselItem>
                        );
                    })
                }
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 top-1/2 transform -translate-y-1/2" onClick={() => {
                imageCarouselApi?.scrollTo(current - 1);
                api?.scrollTo(current - 1);
                setCurrent(current - 1);
            }} />
            <CarouselNext className="absolute right-1 top-1/2 transform -translate-y-1/2" onClick={() => {
                imageCarouselApi?.scrollTo(current + 1);
                api?.scrollTo(current + 1);
                setCurrent(current + 1);
            }} />
        </Carousel>
    )
}