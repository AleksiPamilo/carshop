import { useRef } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { useDictionary } from "../context/DictionaryProvider";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function LoginContent({ closeDialog }: {
    closeDialog: (value: boolean) => void
}) {
    const dictionary = useDictionary();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submit = async () => {
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            toast.error(dictionary.auth.errors.emptyFields);
            return;
        }

        try {
            const res = await signIn("credentials", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                redirect: false,
            });

            if (res?.error) {
                toast.error(dictionary.auth.errors.incorrectCredentials)
                return;
            }

            toast.success(dictionary.auth.signInSuccess);
            closeDialog(true);
        } catch {
            toast.error(dictionary.auth.errors.unknownError);
        }
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
                <PasswordInput ref={passwordRef} />
            </div>
            <Button className="mt-4 w-full" onClick={submit}>{dictionary.auth.signIn}</Button>
        </div>
    )
}