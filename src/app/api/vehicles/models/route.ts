import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

/**
 * This file defines the handler for the route / api / vehicles / models.
 * The URL structure is / api / vehicles / models ?id=<id>.
 * 
 * Query parameters:
 * - id: The id of the vehicles brand. This is a number.
 * The handler supports GET requests and returns a list of models that match the provided id.
 * 
 * @param {NextRequest} req The incoming request object
 * @param {NextResponse} res The response object
 **/
export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id') || undefined;

    try {
        const models = await prisma.model.findMany({
            where: isNaN(parseInt(id ?? ""))
                ? { name: id }
                : { brand_id: parseInt(id ?? "") },
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: models,
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