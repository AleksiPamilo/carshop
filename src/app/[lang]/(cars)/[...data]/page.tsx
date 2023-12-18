"use client";

import { useState, useEffect } from 'react';
import { IVehicle } from '@/interfaces/vehicle';

const VehiclesPage = ({ params }: {
    params: {
        lang: string,
        data: string[],
    }
}) => {
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

    return (
        <div>
            {vehicles.map(vehicle => (
                <div key={vehicle.id}>
                    <p>{vehicle.brand}</p>
                    <p>{vehicle.model}</p>
                </div>
            ))}
            <button onClick={() => setPage(prevPage => prevPage + 1)}>
                Load More
            </button>
        </div>
    );
};

export default VehiclesPage;