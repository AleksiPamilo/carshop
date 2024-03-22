import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDictionary } from "../context/DictionaryProvider";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import validateEmail from "@/utils/validateEmail";
import { useParams } from "next/navigation";

export default function ResetPassword({ closeDialog }: { closeDialog: () => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const dictionary = useDictionary();
    const params = useParams();
    const emailRef = useRef<HTMLInputElement>(null);

    const sendEmail = (email: string) => {
        fetch("/api/auth/request-password-reset", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                lang: params["lang"] ?? null
            })
        })
            .then(() => setEmailSent(true))
            .catch(() => {
                toast(dictionary.auth.errors.unknownError)
                closeDialog();
            });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="my-2 text-sm text-blue-500 hover:text-blue-600">
                {
                    emailSent
                        ? dictionary.common.emailSent
                        : dictionary.auth.forgotPassword
                }
            </DialogTrigger>
            {
                emailSent
                    ? <DialogContent>
                        <h1 className="text-xl">{dictionary.common.emailSent}</h1>
                        <h2>{dictionary.auth.passwordResetNotification}</h2>
                    </DialogContent>
                    : <DialogContent>
                        <h1 className="text-xl">{dictionary.auth.forgotPassword}</h1>
                        <h2>{dictionary.auth.passwordResetInstructions}</h2>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                required
                                ref={emailRef}
                                placeholder={dictionary.auth.email}
                                className="p-2 rounded-md"
                            />
                            <Button
                                onClick={() => {
                                    if (!validateEmail(emailRef.current?.value ?? "") || !emailRef.current?.value) {
                                        return toast(dictionary.auth.errors.emailInvalid);
                                    }

                                    sendEmail(emailRef.current.value);
                                }}
                            >{dictionary.auth.resetPassword}</Button>
                        </div>
                    </DialogContent>
            }
        </Dialog>
    )
}
