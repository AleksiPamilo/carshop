import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: "You are not authenticated."
            }),
            { status: 401 }
        );
    }

    return NextResponse.json({
        authenticated: !!session,
        session
    });
}