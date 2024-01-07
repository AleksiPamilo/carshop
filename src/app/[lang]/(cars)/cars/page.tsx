"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import VehicleList from '@/components/vehicle/VehicleList';
import SearchCar from '@/components/search/SearchCar';
import fetchVehicles from '@/utils/fetchVehicles';
import logger from '@/utils/logger';

export default function CarsPage() {
    const searchParams = useSearchParams();
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

    useEffect(() => {
        fetchVehicles({ page, searchParams })
            .then((json) => {
                if (Array.isArray(json.data)) {
                    setVehicles(json.data);
                    setTotalPages(json.totalPages);
                }
            })
            .catch((err) => logger.error(err));
    }, [page, searchParams]);

    return (
        <div className="pb-12">
            <SearchCar />
            <VehicleList {...{ vehicles, page, pageAmount: totalPages }} />
        </div>

    );
}