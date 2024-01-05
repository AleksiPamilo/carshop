"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import VehicleList from '@/components/vehicle/VehicleList';
import SearchCar from '@/components/search/SearchCar';
import fetchVehicles from '@/utils/fetchVehicles';

export default function CarsPage() {
    const searchParams = useSearchParams();
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchVehicles({
            page,
            searchParams,
            setVehicles
        });
    }, [page, searchParams]);

    return (
        <div className="pb-12">
            <SearchCar />
            <VehicleList {...{ vehicles }} />
        </div>

    );
}