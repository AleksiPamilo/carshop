import { useState, useRef, useEffect } from "react";
import { decode } from "blurhash";
import { useInView } from "react-intersection-observer";

export default function LazyImage({ src, blurhash, alt }: {
    src: string,
    blurhash?: string,
    alt: string,
}) {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [imageRef, inView] = useInView({
        triggerOnce: true,
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasSize = 32;

    useEffect(() => {
        if (inView && canvasRef.current && blurhash) {
            const pixels = decode(blurhash, canvasSize, canvasSize);
            const ctx = canvasRef.current.getContext("2d");

            if (ctx) {
                const imageData = ctx.createImageData(canvasSize, canvasSize);
                imageData.data.set(pixels);

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvasSize;
                tempCanvas.height = canvasSize;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx?.putImageData(imageData, 0, 0);

                ctx.drawImage(tempCanvas, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }

        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSrc(src);
        }
    }, [inView, src, blurhash]);

    return (
        <div ref={imageRef} className="w-full h-full overflow-hidden relative rounded-md">
            {imageSrc ? (
                <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="w-full h-full" />
            )}
        </div>
    )
}