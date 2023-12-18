import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * This file defines the handler for the route / api / vehicles.
 * The URL structure is / api / vehicles ? brand = <brand>& model=<model>& page=<page>& pageSize=<pageSize>.
 * 
 * Query parameters:
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
        const whereClause: Record<string, unknown> = {};
        const paramsArray = Array.from(req.nextUrl.searchParams.entries());
        const paramsObject = Object.fromEntries(paramsArray);

        for (const [key, value] of Object.entries(paramsObject)) {
            if (value && key !== 'page' && key !== 'pageSize') {
                whereClause[key] = {
                    in: String(value).split(','),
                };
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