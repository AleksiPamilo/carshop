import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req: NextResponse, context: any) {
    const { id } = context.params;

    try {
        const whereClause = isNaN(id)
            ? { name: id }
            : { brand_id: parseInt(id) };

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