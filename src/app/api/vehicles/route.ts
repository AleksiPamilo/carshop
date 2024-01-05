import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PAGE_SIZE, VEHICLE_FILTERABLE_COLUMNS } from "@/lib/constants";

interface WhereClause {
    year?: {
        gte?: number;
        lte?: number;
    };
    engineSize?: {
        gte?: number;
        lte?: number;
    };
    price?: {
        gte?: number;
        lte?: number;
    };
    [key: string]: any;
}

type WhereClauseKey = typeof VEHICLE_FILTERABLE_COLUMNS[number];

/**
 * This file defines the handler for the route /api/vehicles.
 * 
 * The URL structure is /api/vehicles with query parameters. 
 * 
 * Query parameters:
 * - id: The ID of the vehicle. This is a number. If this is provided, all other query parameters are ignored.
 * - Other parameters: Refer to the VEHICLE_FILTERABLE_COLUMNS constant in constants.ts for a list of other supported query parameters.
 * 
 * Multiple values for a query parameter can be included, separated by commas.
 * 
 * The handler supports GET requests and returns a list of vehicles that match the provided query parameters.
 */
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const paramsArray = Array.from(req.nextUrl.searchParams.entries());
        const paramsObject = Object.fromEntries(paramsArray);

        const filteredParams = Object.keys(paramsObject)
            .filter(key => VEHICLE_FILTERABLE_COLUMNS.includes(key))
            .reduce((obj: { [key: string]: any }, key) => {
                obj[key] = paramsObject[key];
                return obj;
            }, {});

        if (filteredParams.id) {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(filteredParams.id),
                },
            });

            return new NextResponse(
                JSON.stringify({
                    status: "success",
                    data: vehicle,
                })
            );
        }

        const keyToWhereClause: Record<WhereClauseKey, { operator: string, field: string, type: string }> = {
            minYear: { operator: 'gte', field: 'year', type: 'number' },
            maxYear: { operator: 'lte', field: 'year', type: 'number' },
            engineFrom: { operator: 'gte', field: 'engineSize', type: 'number' },
            engineTo: { operator: 'lte', field: 'engineSize', type: 'number' },
            mileageFrom: { operator: 'gte', field: 'mileage', type: 'number' },
            mileageTo: { operator: 'lte', field: 'mileage', type: 'number' },
            powerFrom: { operator: 'gte', field: 'power', type: 'number' },
            powerTo: { operator: 'lte', field: 'power', type: 'number' },
            priceFrom: { operator: 'gte', field: 'price', type: 'number' },
            priceTo: { operator: 'lte', field: 'price', type: 'number' },
            driverSide: { operator: 'equals', field: 'driverSide', type: 'string' },
        };

        let whereClause: Record<string, WhereClause> = {};

        for (const [key, value] of Object.entries(filteredParams)) {
            if (keyToWhereClause[key as WhereClauseKey]) {
                const { operator, field, type } = keyToWhereClause[key as WhereClauseKey];
                whereClause[field] = whereClause[field] || {};
                whereClause[field][operator] = type === 'number' ? Number(value) : value;
            } else if (!['page'].includes(key)) {
                whereClause = { ...whereClause, ...generateWhereClause(key, value) };
            }
        }

        console.log(whereClause)

        const page = Number(filteredParams.page) || 1;
        const vehicles = await prisma.vehicle.findMany({
            where: whereClause,
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: vehicles,
            })
        );
    } catch (e) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e,
            }),
            { status: 500 }
        );
    }
}

function generateWhereClause(key: string, value: string): Record<string, WhereClause> {
    if (key === 'model') {
        return {
            modelSlug: {
                in: value.split(','),
            },
        };
    } else if (key === 'brand') {
        return {
            brandSlug: {
                in: value.split(','),
            },
        };
    } else {
        return {
            [key]: {
                in: value.split(','),
            },
        };
    }
}