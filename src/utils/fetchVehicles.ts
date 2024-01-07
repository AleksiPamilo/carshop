import logger from "./logger";
import { IVehicle } from "@/interfaces/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface IFetchVehiclesParams {
    id?: string;
    page: number;
    searchParams: URLSearchParams;
    [key: string]: string | number | URLSearchParams | undefined;
}

export default async function fetchVehicles({
    id,
    page,
    searchParams,
    setVehicles,
    setVehicle,
    ...restParams
}: IFetchVehiclesParams): Promise<{ data: IVehicle | IVehicle[]; totalPages: number }> {
    try {
        if (id) {
            const response = await fetch(`${API_URL}/vehicles?id=${id}`);
            const data = await response.json();
            const vehicle: IVehicle = data.data;

            return {
                data: vehicle,
                totalPages: 0,
            }
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
        const newVehicles: IVehicle[] = data.data;

        if (data.status === 'error') {
            logger.error('Failed to fetch vehicles:', data.message);
            return {
                data: [],
                totalPages: 0,
            };
        }

        return {
            data: newVehicles,
            totalPages: data.totalPages,
        }
    } catch (e) {
        logger.error('Failed to fetch vehicles:', e);

        return {
            data: [],
            totalPages: 0,
        }
    }
};
