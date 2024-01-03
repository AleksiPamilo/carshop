"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import type { Locale } from '@/../locale-config';
import VehicleList from '@/components/VehicleList';
import VehicleDetails from '@/components/VehicleDetails';
import SearchCar from '@/components/SearchCar';

export default function VehiclesPage({ params }: {
    params: {
        lang: Locale,
        data: string[],
    }
}) {
    const searchParams = useSearchParams();
    const [brand, model, id] = params.data;
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchVehicles();
    }, [page]);

    const fetchVehicles = async () => {
        try {
            if (id) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles?id=${id}`);
                const json = await response.json();
                setVehicle(json.data);
            } else {
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

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles?${queryString}`);
                const data = await response.json();
                const newVehicles = data.data;

                setVehicles(prevVehicles => {
                    const seen = new Set(prevVehicles.map(vehicle => vehicle.id));
                    const uniqueVehicles = newVehicles.filter((vehicle: IVehicle) => !seen.has(vehicle.id));
                    return [...prevVehicles, ...uniqueVehicles];
                });
            }
        } catch (e) {
            console.error('Failed to fetch vehicles:', e);
        }
    };

    if (id) {
        return VehicleDetails({ vehicle });
    }

    return (
        <div>
            <SearchCar />
            <VehicleList {...{ vehicles }} />
        </div>
    )
};