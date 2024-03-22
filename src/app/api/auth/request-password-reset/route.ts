import { prisma } from "@/lib/prisma";
import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getDictionary } from "@/utils/getDictionary";

export async function POST(req: Request) {
    try {
        const { email, lang } = await req.json();

        // Find user with the email address
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        // If there is no user with the email address, return error with a message that user does not exist
        if (!user) {
            return new NextResponse(
                JSON.stringify({
                    status: "Error",
                    message: "No user was found with this email address!"
                }),
                { status: 400 }
            )
        }

        // If the user exists, generate a token for password reset
        const token = randomBytes(32).toString("hex");

        // Update the user to include the resetToken and set its expiry time to 1 hours from now
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: token,
                resetTokenExpires: new Date(Date.now() + 3600000)
            }
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;
        const dictionary = await getDictionary(lang ?? "fi");
        const { subject, greeting, requestReset, ifNotRequested, regards, clickHereToReset, companyName } = dictionary.emails.resetPassword;

        const transporter = createTransport({
            host: process.env["SMTP_HOST"],
            port: parseInt(process.env["SMTP_PORT"] || "2525"),
            secure: false,
            auth: {
                user: process.env["SMTP_USER"],
                pass: process.env["SMTP_PASS"]
            },
        });

        await transporter.sendMail({
            from: process.env["SMTP_FROM"],
            to: email,
            subject: subject,
            text: `${greeting}, ${user.name}!\n\n${requestReset}\n\n${resetUrl}\n\n${ifNotRequested}\n\n${regards}\n${companyName}`,
            html: `<p>${greeting}, ${user.name}!</p><p>${requestReset} <a href="${resetUrl}">${clickHereToReset}</a></p><p>${ifNotRequested}</p><p>${regards}<br>${companyName}</p>`
        });

        return new NextResponse(
            JSON.stringify({
                status: "Success",
                message: "Email sent successfully!"
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