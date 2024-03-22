import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

/**
 * This file defines the handler for the route / api / vehicles / newest.
 * The URL structure is / api / vehicles / newest ?amount=<amount>.
 * 
 * Query parameters:
 * - Amount: The amount of vehicles we want to get from the database
 * The handler supports GET requests and returns a list of models that match the provided id.
 * 
 * @param {NextRequest} req The incoming request object
 * @param {NextResponse} res The response object
 **/
export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const amount = searchParams.get('amount') || undefined;

    try {
        const vehicles = await prisma.vehicle.findMany({
            include: {
                basicInfo: true,
                technicalInfo: true,
            },
            orderBy: {
                listingCreatedAt: "desc",
            },
            take: parseInt(amount ?? "5")
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: vehicles,
            })
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: "unexpected internal server error"
            }),
            { status: 500 }
        );
    }
}