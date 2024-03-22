import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash, genSalt } from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    gte: new Date(),
                }
            },
        });

        if (!user) {
            return new NextResponse(
                JSON.stringify({
                    status: "Error",
                    message: "Invalid or expired token"
                }),
                { status: 400 }
            )
        }

        const hashPassword = async (password: string): Promise<string> => {
            const salt = await genSalt(12);
            const hashedPassword = await hash(password, salt);
            return hashedPassword;
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: await hashPassword(password),
                resetToken: null,
                resetTokenExpires: null,
            }
        })

        return new NextResponse(
            JSON.stringify({
                status: "Success",
                message: "Password updated successfully!"
            }),
            { status: 200 }
        );
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "Error",
                message: e.message,
            }),
            { status: 500 }
        )
    }
}