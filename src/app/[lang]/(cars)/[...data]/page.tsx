"use client";

import { useState, useEffect } from 'react';
import { IVehicle } from '@/interfaces/vehicle';
import { useDictionary } from '@/hooks';
import Vehicle from '../../components/cards/Vehicle';
import Button from '../../components/Button';
import type { Locale } from '@/../locale-config';
import SearchCar from '../../components/SearchCar';
import Loading from '../../components/Loading';

export default function VehiclesPage({ params }: {
    params: {
        lang: Locale,
        data: string[],
    }
}) {
    const dictionary = useDictionary();
    const [brand, model, fuelType] = params.data;
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchVehicles = async () => {
        const params = {
            brand,
            model,
            fuelType,
            page,
            pageSize,
        };

        const queryString = Object.entries(params)
            .filter(([_, value]) => value != null)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await fetch(`http://localhost:3000/api/vehicles?${queryString}`);
        const data = await response.json();
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

    if (!dictionary) {
        return <Loading />;
    }

    return (
        <div>
            <SearchCar dictionary={dictionary ?? require("@/dictionaries/fi.json")} />
            <div className="flex">
                {vehicles.map(vehicle => (
                    <Vehicle key={vehicle.id} {...{ vehicle, dictionary }} />
                ))}
            </div>

            <div>
                <Button onClick={() => setPage(prevPage => prevPage + 1)}>
                    Load More
                </Button>
            </div>
        </div>
    );
};