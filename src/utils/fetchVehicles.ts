import { IVehicle } from "@/interfaces/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetchVehicles({
    id,
    brand,
    model,
    page,
    pageSize,
    searchParams,
    setVehicles,
    setVehicle,
}: {
    id?: string;
    brand?: string;
    model?: string;
    page: number;
    pageSize: number;
    searchParams: URLSearchParams;
    setVehicles: React.Dispatch<React.SetStateAction<IVehicle[]>>;
    setVehicle?: React.Dispatch<React.SetStateAction<IVehicle | null>>;
}) {
    try {
        if (id) {
            const response = await fetch(`${API_URL}/vehicles?id=${id}`);
            const data = await response.json();
            setVehicle?.(data.data);
            return;
        }

        let params: { [key: string]: string | number } = {
            page,
            pageSize,
        };

        if (brand) {
            params.brand = brand;
        }

        if (model) {
            params.model = model;
        }

        searchParams.forEach((value, key) => {
            params[key] = value;
        });

        const queryString = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await fetch(`${API_URL}/vehicles?${queryString}`);
        const data = await response.json();
        const newVehicles = data.data;

        setVehicles(prevVehicles => {
            const seen = new Set(prevVehicles.map(vehicle => vehicle.id));
            const uniqueVehicles = newVehicles.filter((vehicle: IVehicle) => !seen.has(vehicle.id));
            return [...prevVehicles, ...uniqueVehicles];
        });
    } catch (e) {
        console.error('Failed to fetch vehicles:', e);
    }
};