"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const res = await signIn("credentials", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                callbackUrl: "/",
            });

            if (res?.error) {
                setError(res.error);
                setLoading(false);
                return;
            }

            clearForm();

        } catch (e: any) {
            setError(e.message);
            setLoading(false);
        }
    }

    function clearForm() {
        setLoading(false);
        setError(null);

        emailRef.current!.value = "";
        passwordRef.current!.value = "";
    }

    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="bg-gray-800 w-[23rem] md:w-[30rem] p-4 rounded-md text-black dark:text-white">
                <h1 className="text-2xl font-semibold uppercase">Login</h1>

                {error && (
                    <div className="flex items-center gap-2 mt-4">
                        <span>{error}</span>
                    </div>
                )}

                <form className="flex flex-col gap-4 mt-4" onSubmit={submit}>
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            required
                            ref={emailRef}
                            placeholder="Email"
                            className="text-black border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                        />
                        <input
                            type="password"
                            required
                            ref={passwordRef}
                            placeholder="Password"
                            className="text-black border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                        />

                    </div>

                    <Link href="/login" className="text-blue-600">
                        Don't have an account?
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none hover:ring-2 hover:ring-indigo-500 disabled:cursor-not-allowed"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    )
}