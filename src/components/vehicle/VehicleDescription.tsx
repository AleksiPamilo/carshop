import { useState } from 'react';
import { IVehicle } from "@/interfaces/vehicle";
import { useDictionary } from "../context/DictionaryProvider";

export default function VehicleDescription({ vehicle }: { vehicle: IVehicle }) {
    const dictionary = useDictionary();
    const description = vehicle.basicInfo.description?.replace(/\\n/g, '\n');
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="w-full mt-8">
            {vehicle.basicInfo.description &&
                <div className="border p-4 rounded-lg relative">
                    <h1 className="font-semibold mb-2">{dictionary.common.description}</h1>
                    <div className={`overflow-hidden relative transition-all duration-500 ${showFullDescription ? 'max-h-[1000px]' : 'max-h-[5rem] cursor-pointer'}`} onClick={() => !showFullDescription && toggleDescription()}>
                        <p className={`${!showFullDescription ? 'cursor-pointer' : 'whitespace-pre-line'}`}>{description}</p>
                        {!showFullDescription &&
                            <div className="absolute inset-x-0 bottom-0 w-full h-full bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none"></div>
                        }
                    </div>
                    <button className="mt-2" onClick={toggleDescription}>{showFullDescription ? dictionary.common.showLess : dictionary.common.showMore}</button>
                </div>
            }
        </div>
    );
}