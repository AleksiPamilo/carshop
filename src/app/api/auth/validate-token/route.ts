import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import logger from "@/utils/logger";

export async function POST(req: Request) {
    const { token } = await req.json();

    if (!token) {
        return new NextResponse(JSON.stringify({
            message: "Token is required!"
        }), { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    gte: new Date()
                },
            },
        });

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: "Invalid or expired token"
            }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({
            message: "Token is valid!"
        }), { status: 200 });
    } catch (e) {
        logger.error("Error validating token:", e);
        return new NextResponse(JSON.stringify({
            message: "Internal server error"
        }), { status: 500 });
    }
}