import { IVehicle } from './vehicle';

export interface IUser {
    id: string,
    name: string,
    password: string,
    email: string,
    emailVerified: boolean,
    createdAt: Date,
    vehicles: IVehicle[]
}