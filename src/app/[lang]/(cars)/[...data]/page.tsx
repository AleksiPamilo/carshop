"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import type { Locale } from '@/../locale-config';
import VehicleList from '@/components/vehicle/VehicleList';
import VehicleDetails from '@/components/vehicle/VehicleDetails';
import SearchCar from '@/components/search/SearchCar';
import fetchVehicles from '@/utils/fetchVehicles';

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

    useEffect(() => {
        fetchVehicles({
            id,
            brand,
            model,
            page,
            searchParams,
            setVehicles,
            setVehicle,
        });
    }, [page, brand, id, model, searchParams]);

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