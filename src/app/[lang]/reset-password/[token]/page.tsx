"use client";

import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
    const dictionary = useDictionary();
    const pathname = usePathname();
    const router = useRouter();
    const token = pathname.split("/").pop();
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Validate the token when the component mounts, or token changes
        // Update the "isValidToken" state based on the validation result
        fetch("/api/auth/validate-token", {
            method: "POST",
            body: JSON.stringify({
                token: token,
            })
        }).then(res => {
            // Handle the response based on token validation
            if (res.status === 200) {
                setIsValidToken(true);
            } else {
                setIsValidToken(false);
            }
        }).catch(() => {
            // Set the state to false if there's an error during token validation
            setIsValidToken(false)
        });
    }, [token])

    const submit = async () => {
        // Handle form submission for changing the password
        // Perform input validation before submitting the form
        // Call the API to change the password and handle the response

        /**
         * Set password requirements:
         * Contains at least 1 uppercase letter
         * Contains at least 1 special character
         * Is at least 6 characters long
         */
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

        // Check that the password input is not empty
        if (!passwordRef.current?.value || !passwordConfirmRef.current?.value) {
            return toast(dictionary.auth.errors.emptyFields);
        }

        // Check that the two passwords match each other
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return toast(dictionary.auth.errors.passwordsDontMatch);
        }

        // Check that the password matches the requirements
        if (!passwordRegex.test(passwordRef.current?.value)) {
            return toast(dictionary.auth.errors.invalidPassword);
        }

        // If all checks are passed, change the password by calling this api with the token and password
        fetch("/api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({
                token: token,
                password: passwordRef.current.value
            })
        }).then((res) => {
            if (res.status === 200) {
                // If the password change is successfull, show a toast notification, and a new window
                toast(dictionary.auth.passwordChanged.title);
                setIsPasswordChanged(true);
            } else {
                // If the password change is not successfull, show a notification that it failed for unknown reason
                toast(dictionary.auth.errors.unknownError);
            }
        }).catch(() => {
            // If the password change is not successfull, show a notification that it failed for unknown reason
            toast(dictionary.auth.errors.unknownError);
        })
    };

    // If password is changed, show a "notification" that the password is changed, and show a button to return to front page
    if (isPasswordChanged) return (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col gap-4 w-[35rem] rounded-md p-4 border border-zinc-300 dark:border-zinc-800">
                <h1 className="text-lg">{dictionary.auth.passwordChanged.title}</h1>
                <p>{dictionary.auth.passwordChanged.desc}</p>
                <Button onClick={() => router.push("/")}>{dictionary.common.returnToFrontPage}</Button>
            </div>
        </div>
    )

    // If the token is null, show a loading state
    else if (isValidToken === null) return (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex space-x-2 animate-pulse justify-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay:100" />
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-200" />
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-300" />
            </div>
            <h1 className="text-lg mt-2 animate-pulse">{dictionary.common.loading}...</h1>
        </div>
    )

    // If the token is not valid, show a "notification", that the token is not valid or expired
    else if (!isValidToken) return (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col gap-4 w-[35rem] rounded-md p-4 border border-zinc-300 dark:border-zinc-800">
                <h1 className="text-lg">{dictionary.auth.errors.invalidToken.title}</h1>
                <p>{dictionary.auth.errors.invalidToken.desc}</p>
                <Button onClick={() => router.push("/")}>{dictionary.common.returnToFrontPage}</Button>
            </div>
        </div>
    )

    // If the password is not changed yet, and token is valid, show a form to change the password
    else return (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col gap-4 w-[30rem] rounded-md p-4 border border-zinc-300 dark:border-zinc-800">
                <h1 className="text-lg">{dictionary.auth.selectNewPassword}</h1>

                <div className="flex flex-col gap-2">
                    <PasswordInput ref={passwordRef} />
                    <PasswordInput ref={passwordConfirmRef} label={dictionary.auth.confirmPassword} />
                    <Button onClick={submit}>{dictionary.common.confirm}</Button>
                </div>
            </div>
        </div>
    )
}