import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const models = await prisma.model.findMany({
            include: {
                brand: false,
            },
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: models,
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