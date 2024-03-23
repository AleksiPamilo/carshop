import { useEffect, useState } from "react";
import { useDictionary } from "./context/DictionaryProvider";
import { IVehicle } from "@/interfaces/vehicle";
import VehicleCard from "./cards/Vehicle";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Showcase() {
    const dictionary = useDictionary();
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/vehicles/newest?amount=6`);
            const json = await res.json();

            setVehicles(json.data);
        })();
    }, []);

    if (vehicles.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <h1 className="md:col-span-2 xl:col-span-3 text-xl font-semibold">{dictionary.common.showcase}</h1>
            {
                vehicles.map(vehicle => (
                    <div>
                        <VehicleCard vehicle={vehicle} />
                    </div>
                ))
            }

            <Link
                className="md:col-span-2 xl:col-span-3 text-center px-2 py-3 rounded-md bg-blue-600 hover:bg-blue-700"
                href="/cars">
                {dictionary.common.showMore}
            </Link>
        </div>
    )
}