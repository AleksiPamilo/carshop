import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

/**
 * This file defines the handler for the route / api / vehicles / models.
 * The URL structure is / api / vehicles / models ?id=<id> &brand_id=<brand_id>.
 * 
 * Query parameters:
 * - id: The id or name of the model. This is a string or a number.
 * - brand_id: The id of the brand. This is a number.
 * The handler supports GET requests and returns a list of models that match the provided id.
 * 
 * @param {NextRequest} req The incoming request object
 * @param {NextResponse} res The response object
 **/
export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id') || undefined;
    const brand_id = searchParams.get('brand_id') || undefined;

    try {
        const whereClause: {
            id?: number,
            name?: string,
            brand_id?: number,
        } = {};

        if (id) {
            if (isNaN(parseInt(id))) {
                whereClause['name'] = id;
            } else {
                whereClause['id'] = parseInt(id);
            }
        }

        if (brand_id) {
            whereClause['brand_id'] = parseInt(brand_id);
        }

        const models = await prisma.model.findMany({
            where: whereClause,
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