import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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