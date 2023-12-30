import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface WhereClause {
    year?: {
        gte?: number;
        lte?: number;
    };
    [key: string]: any;
}

/**
 * This file defines the handler for the route / api / vehicles.
 * The URL structure is / api / vehicles ? id = <id> & brand = <brand>& model=<model> &minYear<minYear> &maxYear<maxYear> & page=<page>& pageSize=<pageSize>.
 * 
 * Query parameters:
 * - id: The ID of the vehicle. This is a number. If this is provided, all other query parameters are ignored.
 * - brand: The brand of the vehicle. This is a string. Multiple brands can be included, separated by commas.
 * - model: The model of the vehicle. This is a string. Multiple models can be included, separated by commas.
 * - page: The page number for pagination. This is a number. Default is 1.
 * - pageSize: The number of items per page for pagination. This is a number. Default is 10.
 * The handler supports GET requests and returns a list of vehicles that match the provided brand and model.
 
    @param {NextRequest} req The incoming request object
    @param {NextResponse} res The response object
**/
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const paramsArray = Array.from(req.nextUrl.searchParams.entries());
        const paramsObject = Object.fromEntries(paramsArray);

        if (paramsObject.id) {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(paramsObject.id),
                },
            });

            return new NextResponse(
                JSON.stringify({
                    status: "success",
                    data: vehicle,
                })
            );
        }

        let whereClause: Record<string, WhereClause> = {};
        for (const [key, value] of Object.entries(paramsObject)) {
            if (value && key !== 'page' && key !== 'pageSize' && key !== 'minYear' && key !== 'maxYear') {
                whereClause = { ...whereClause, ...generateWhereClause(key, value) };
            }
        }

        if (paramsObject.minYear || paramsObject.maxYear) {
            whereClause.year = {};

            if (paramsObject.minYear) {
                whereClause.year.gte = Number(paramsObject.minYear);
            }

            if (paramsObject.maxYear) {
                whereClause.year.lte = Number(paramsObject.maxYear);
            }
        }

        const page = Number(paramsObject.page) || 1;
        const pageSize = Number(paramsObject.pageSize) || 10;

        const vehicles = await prisma.vehicle.findMany({
            where: whereClause,
            take: pageSize,
            skip: (page - 1) * pageSize,
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