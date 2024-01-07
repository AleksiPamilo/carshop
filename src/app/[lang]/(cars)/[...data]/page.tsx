"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IVehicle } from '@/interfaces/vehicle';
import type { Locale } from '@/../locale-config';
import VehicleList from '@/components/vehicle/VehicleList';
import VehicleDetails from '@/components/vehicle/VehicleDetails';
import SearchCar from '@/components/search/SearchCar';
import fetchVehicles from '@/utils/fetchVehicles';
import logger from '@/utils/logger';

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
    const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchVehicles({
            id,
            brand,
            model,
            page,
            searchParams
        })
            .then((json) => {
                if (!Array.isArray(json.data)) {
                    setVehicle(json.data);
                    setTotalPages(undefined);
                } else {
                    setVehicles(json.data);
                    setTotalPages(json.totalPages);
                }
            })
            .catch((err) => logger.error(err));
    }, [page, brand, id, model, searchParams]);

    if (id) {
        return VehicleDetails({ vehicle });
    }

    return (
        <div>
            <SearchCar />
            <VehicleList {...{ vehicles, page, setPage, pageAmount: totalPages }} />
        </div>
    )
};