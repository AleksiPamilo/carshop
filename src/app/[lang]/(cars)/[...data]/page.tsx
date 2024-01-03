"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import type { Locale } from '@/../locale-config';
import VehicleList from '@/components/VehicleList';
import VehicleDetails from '@/components/VehicleDetails';
import SearchCar from '@/components/SearchCar';
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
    const pageSize = 10;

    useEffect(() => {
        fetchVehicles({
            id,
            brand,
            model,
            page,
            pageSize,
            searchParams,
            setVehicles,
            setVehicle,
        });
    }, [page]);

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