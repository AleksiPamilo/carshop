import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "example@example.fi",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: email },
                });

                if (!user || !(await compare(password, user.password))) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as { id: number, name: string, email: string };
                return {
                    ...token,
                    id: u.id,
                }
            }

            return token;
        }
    },
    pages: {
        signIn: "/login",
    }
};