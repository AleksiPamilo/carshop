type InputType = {
    name: string,
    type: string,
    required: boolean,
}

export const basicInfoInputs: InputType[] = [

    { name: "brand", type: "number", required: true },
    { name: "model", type: "number", required: true },
    { name: "year", type: "number", required: true },
    { name: "driverSide", type: "text", required: false },
    { name: "licensePlate", type: "text", required: true },
    { name: "firstRegistration", type: "text", required: false },
    { name: "inspectionDate", type: "text", required: false },
    { name: "previousOwners", type: "number", required: false },
    { name: "color", type: "text", required: false },
    { name: "paintType", type: "text", required: false },
    { name: "description", type: "text", required: false },
    { name: "mileage", type: "number", required: false },
    { name: "price", type: "number", required: true }
];

export const techInfoInputs: InputType[] = [
    { name: "fuelType", type: "text", required: true },
    { name: "engineSize", type: "number", required: false },
    { name: "drivetrain", type: "text", required: true },
    { name: "transmission", type: "text", required: true },
    { name: "seats", type: "number", required: true },
    { name: "doors", type: "number", required: true },
    { name: "power", type: "number", required: true },
    { name: "torque", type: "number", required: true },
    { name: "topSpeed", type: "number", required: true },
    { name: "acceleration", type: "text", required: true },
    { name: "co2Emission", type: "number", required: true },
    { name: "fuelCapacity", type: "number", required: true },
    { name: "fuelConsumption", type: "text", required: true },
    { name: "weight", type: "number", required: true },
    { name: "totalWeight", type: "number", required: true },
    { name: "towWeightWithoutBrakes", type: "number", required: true },
    { name: "towWeightWithBrakes", type: "number", required: true }
];
