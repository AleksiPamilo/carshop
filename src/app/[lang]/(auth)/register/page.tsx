"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getDictionary } from "@/../get-dictionary";
import { IDictionary } from "@/interfaces/dictionary";
import type { Locale } from "../../../../../locale-config";

export default function Register({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const [dictionary, setDictionary] = useState<IDictionary | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<{ password: boolean, confirmPassword: boolean }>({ password: false, confirmPassword: false });
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (lang)
            getDictionary(lang)
                .then(setDictionary)
                .catch(() => setDictionary(null));
    }, [lang]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(false);
        setError(null);

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            setError(dictionary?.auth.errors.passwordsDontMatch ?? "Passwords don't match");
            setLoading(false);
            return;
        }

        if (passwordRef.current?.value && passwordRef.current.value.length < 6) {
            setError(dictionary?.auth.errors.passwordLength ?? "Password too short");
            setLoading(false);
            return;
        }

        fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                name: nameRef.current?.value,
                password: passwordRef.current?.value,
            }),
        })
            .then(() => clearForm())
            .catch(() => {
                setError(dictionary?.auth.errors.unknownError ?? "Unknown error");
                setLoading(false);
            });
    }

    function clearForm() {
        setLoading(false);
        setError(null);

        emailRef.current!.value = "";
        nameRef.current!.value = "";
        passwordRef.current!.value = "";
        confirmPasswordRef.current!.value = "";
    }

    return (
        <main className="w-screen h-[50rem] flex items-center justify-center">
            <div className="bg-gray-800 w-[23rem] md:w-[30rem] p-4 rounded-md text-black dark:text-white">
                <h1 className="text-2xl font-semibold uppercase">{dictionary?.auth.signUp}</h1>

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
                            placeholder={dictionary?.auth.email}
                            className="text-black border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                        />
                        <input
                            type="text"
                            required
                            ref={nameRef}
                            placeholder={dictionary?.auth.username}
                            className="text-black border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                        />
                        <div className="relative">
                            <input
                                type={showPassword.password ? "text" : "password"}
                                required
                                ref={passwordRef}
                                placeholder={dictionary?.auth.password}
                                className="text-black w-full border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 text-xl"
                                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                            >
                                {showPassword.password ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                required
                                ref={confirmPasswordRef}
                                placeholder={dictionary?.auth.confirmPassword}
                                className="text-black w-full border-2 rounded-md p-2 focus:outline-0 focus:border-blue-600"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 text-xl"
                                onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                            >
                                {showPassword.confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                    </div>

                    <Link href="/login" className="text-blue-600">
                        {dictionary?.auth.alreadyHaveAccount}
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-0 focus:ring-2 hover:ring-2 ring-indigo-500 disabled:cursor-not-allowed"
                    >
                        {loading ? dictionary?.loading : dictionary?.auth.signUp}
                    </button>
                </form>
            </div>
        </main>
    )
}
