import { useRef } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { useDictionary } from "../context/DictionaryProvider";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function SignUpContent({ closeDialog }: {
    closeDialog: (value: boolean) => void
}) {
    const dictionary = useDictionary();
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const submit = () => {
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            toast.error(dictionary.auth.errors.passwordsDontMatch);
            return;
        }

        if (passwordRef.current?.value && passwordRef.current.value.length < 6) {
            toast.error(dictionary.auth.errors.passwordLength);
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
            .then(() => {
                toast.success(dictionary.auth.signUpSuccess);
                closeDialog(true);
            })
            .catch(() => {
                toast.error(dictionary.auth.errors.unknownError);
            });
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <Input
                    type="email"
                    required
                    ref={emailRef}
                    placeholder={dictionary.auth.email}
                    className="p-2 rounded-md"
                />

                <Input
                    type="text"
                    required
                    ref={nameRef}
                    placeholder={dictionary.auth.username}
                    className="p-2 rounded-md"
                />

                <PasswordInput ref={passwordRef} />
                <PasswordInput ref={passwordConfirmRef} label={dictionary.auth.confirmPassword} />
            </div>
            <Button className="mt-4 w-full" onClick={submit}>{dictionary.auth.signUp}</Button>
        </div>
    )
}