import { IVehicle } from "@/interfaces/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface IFetchVehiclesParams {
    id?: string;
    page: number;
    searchParams: URLSearchParams;
    setVehicles: React.Dispatch<React.SetStateAction<IVehicle[]>>;
    setVehicle?: React.Dispatch<React.SetStateAction<IVehicle | null>>;
    [key: string]: string | number | URLSearchParams | React.Dispatch<React.SetStateAction<IVehicle[]>> | React.Dispatch<React.SetStateAction<IVehicle | null>> | undefined;
}

export default async function fetchVehicles({
    id,
    page,
    searchParams,
    setVehicles,
    setVehicle,
    ...restParams
}: IFetchVehiclesParams) {
    try {
        if (id) {
            const response = await fetch(`${API_URL}/vehicles?id=${id}`);
            const data = await response.json();
            setVehicle?.(data.data);
            return;
        }

        let queryParams: { [key: string]: string | number } = {
            page
        };

        Object.keys(restParams).forEach(key => {
            const value = restParams[key];
            if (typeof value === 'string' || typeof value === 'number') {
                queryParams[key] = value;
            }
        });

        searchParams.forEach((value, key) => {
            queryParams[key] = value;
        });

        const queryString = Object.entries(queryParams)
            .filter(([_, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await fetch(`${API_URL}/vehicles?${queryString}`);
        const data = await response.json();
        const newVehicles = data.data;

        if (data.status === 'error') {
            console.error('Failed to fetch vehicles:', data.message);
            return;
        }

        setVehicles(newVehicles);
    } catch (e) {
        console.error('Failed to fetch vehicles:', e);
    }
};
