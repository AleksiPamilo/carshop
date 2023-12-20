import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

/**
 * This file defines the handler for the route / api / vehicles / brands.
 * The URL structure is / api / vehicles / brands.
 * 
 * The handler supports GET requests and returns a list of brands.
 * 
 * @param {NextApiRequest} req The incoming request object
 * @param {NextApiResponse} res The response object
 **/
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const brands = await prisma.brand.findMany();

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: brands,
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