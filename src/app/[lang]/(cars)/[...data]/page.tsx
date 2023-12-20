"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import { useDictionary } from '@/hooks';
import Vehicle from '@/components/cards/Vehicle';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/../locale-config';

export default function VehiclesPage({ params }: {
    params: {
        lang: Locale,
        data: string[],
    }
}) {
    const dictionary = useDictionary();
    const searchParams = useSearchParams();

    const [brand, model] = params.data;
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchVehicles = async () => {
        let params: { [key: string]: string | number } = {
            brand,
            model,
            page,
            pageSize,
        };

        searchParams.forEach((value, key) => {
            params[key] = value;
        });

        const queryString = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await fetch(`http://localhost:3000/api/vehicles?${queryString}`);
        const data = await response.json();
        console.log(queryString, data, searchParams.get("minYear"))
        const newVehicles = data.data;

        setVehicles(prevVehicles => {
            const seen = new Set(prevVehicles.map(vehicle => vehicle.id));
            const uniqueVehicles = newVehicles.filter((vehicle: IVehicle) => !seen.has(vehicle.id));
            return [...prevVehicles, ...uniqueVehicles];
        });
    };

    useEffect(() => {
        fetchVehicles();
    }, [page]);

    return (
        <div>
            <div className="flex flex-wrap items-center justify-center">
                {vehicles.map(vehicle => (
                    <Vehicle key={vehicle.id} {...{ vehicle, dictionary }} />
                ))}
            </div>

            {/* TODO: Update UI / Maybe pagination */}
            <div className="bg-zinc-900 text-center mt-20">
                <span>You've reached the bottom!</span>
                <Button onClick={() => setPage(prevPage => prevPage + 1)}>
                    Load More
                </Button>
            </div>

        </div>
    );
};