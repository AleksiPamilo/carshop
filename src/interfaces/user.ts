import { IVehicle } from './vehicle';

export interface IUser {
    id: string,
    name: string,
    password: string,
    email: string,
    emailVerified: boolean,
    phone: string | null,
    phoneVerified: boolean,
    createdAt: Date,
    vehicles: IVehicle[]
}