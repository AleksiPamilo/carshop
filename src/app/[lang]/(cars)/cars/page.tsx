"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import VehicleList from '@/components/vehicle/VehicleList';
import SearchCar from '@/components/SearchCar';
import fetchVehicles from '@/utils/fetchVehicles';

export default function CarsPage() {
    const searchParams = useSearchParams();
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchVehicles({
            page,
            pageSize,
            searchParams,
            setVehicles
        });

        console.log("x: ", vehicles)
    }, [page, searchParams]);

    return (
        <div className="pb-12">
            <SearchCar />
            <VehicleList {...{ vehicles }} />
        </div>

    );
}