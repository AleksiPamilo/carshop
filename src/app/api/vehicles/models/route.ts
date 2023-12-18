import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

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