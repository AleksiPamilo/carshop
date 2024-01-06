import Image from "next/image";
import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { useInView } from "react-intersection-observer";

export default function LazyImage({ src, blurhash, alt }: {
    src?: string,
    blurhash?: string,
    alt: string,
}) {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [imageRef, inView] = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        const img = new window.Image();

        if (!src) {
            return;
        }

        img.src = src;
        img.onload = () => {
            setImageSrc(src);
        }
    }, [inView, src, blurhash]);

    return (
        <div ref={imageRef} className="w-full h-full overflow-hidden relative rounded-md">
            {imageSrc ? (
                <Image src={imageSrc} alt={alt} className="w-full h-full" fill priority style={{ objectFit: "cover" }} />
            ) : (
                blurhash && blurhash.length >= 6 && (
                    <Blurhash
                        hash={blurhash}
                        width="100%"
                        height="100%"
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                    />
                )
            )}
        </div>
    )
}