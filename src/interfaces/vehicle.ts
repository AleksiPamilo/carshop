import { IUser } from './user';

export interface IFuelConsumptions {
    id: number;
    city: number;
    highway: number;
    combined: number;
}

export interface IVehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    licensePlate: string;
    vin?: string;
    odometer: number;
    transmission: string;
    doors: number;
    seats: number;
    engineSize: number;
    fuelType: string;
    fuelCapacity: number;
    fuelConsumption?: IFuelConsumptions;
    fuelConsumption_id?: number;
    price: number;
    description: string;
    user: IUser;
    user_id: string;
    images: string[];
    listingCreatedAt: Date;
    listingUpdatedAt?: Date;
    soldAt?: Date;
}