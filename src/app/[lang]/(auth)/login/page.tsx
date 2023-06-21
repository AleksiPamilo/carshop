"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/../get-dictionary";
import { Locale, i18n } from "@/../i18n-config";


export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await signIn("credentials", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
                setLoading(false);
                return;
            }

            router.push("/");
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
        <main className="w-screen h-[50rem] flex items-center justify-center">
            <div className="bg-gray-800 w-[23rem] md:w-[30rem] p-4 rounded-md text-black dark:text-white">
                <h1 className="text-2xl font-semibold uppercase">Login</h1>

                {error && (
                    <div className="flex items-center justify-center gap-2 mt-4 bg-red-500 rounded-md p-3">
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

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                ref={passwordRef}
                                placeholder="Password"
                                className="text-black w-full border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 text-xl"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                    </div>

                    <Link href="/register" className="text-blue-600">
                        Don't have an account?
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none hover:ring-2 hover:ring-indigo-500 disabled:cursor-not-allowed"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </main>
    )
}