import { prisma } from "@/lib/prisma";
import { hash, genSalt } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = (await req.json()) as {
            name: string;
            email: string;
            password: string;
        };

        const hashPassword = async (password: string): Promise<string> => {
            const salt = await genSalt(12);
            const hashedPassword = await hash(password, salt);
            return hashedPassword;
        }

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: await hashPassword(password),
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message,
            }),
            { status: 500 }
        )
    }
}