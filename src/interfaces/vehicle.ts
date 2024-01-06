import { IUser } from "./user";

export interface IBrand {
    id: number,
    name: string,
    slug: string,
    models: IModel[],
}

export interface IModel {
    id: number,
    slug: string,
    name: string,
}

export interface IFuelConsumptions {
    id: number,
    city: number,
    highway: number,
    combined: number,
}

export interface IBasicInfo {
    id: number,
    year: number,
    driverSide: string,
    licensePlate: string
    firstRegistration?: Date
    inspectionDate?: Date
    previousOwners?: number
    color: string
    paintType: string
    description?: string
    mileage: number,
    price: number
    vehicle?: IVehicle,
}

export interface ITechnicalInfo {
    id: number,
    fuelType: string,
    engineSize: number,
    drivetrain: string,
    transmission: string,
    seats?: number,
    doors?: number,
    power?: number,
    torque?: number,
    topSpeed?: number,
    acceleration?: number,
    co2Emission?: number,
    fuelCapacity?: number,
    fuelConsumption?: number,
    fuelConsumptionId?: number,
    weight?: number,
    totalWeight?: number
    towWeightWithoutBrakes?: number,
    towWeightWithBrakes?: number,
    vehicle?: IVehicle,
}

export interface IVehicle {
    id: number,
    brandName: string,
    brandSlug: string,
    modelName: string,
    modelSpec?: string,
    modelSlug: string,
    basicInfo: IBasicInfo,
    basicInfo_id: number,
    technicalInfo: ITechnicalInfo,
    technicalInfo_id: number,
    user: IUser,
    user_id: string,
    listingCreatedAt: Date
    listingUpdatedAt?: Date
    soldAt?: Date

}