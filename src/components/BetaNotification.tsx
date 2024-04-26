"use client";

import { IDictionary } from "@/interfaces/dictionary";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function BetaNotification({ dictionary }: { dictionary: IDictionary }) {
    const [open, setOpen] = useState<boolean>(true);

    useEffect(() => {
        const seen = typeof sessionStorage !== undefined
            ? sessionStorage.getItem("beta-notification") === "seen"
                ? false
                : true
            : true;
        setOpen(seen);
    }, []);

    return (
        <dialog className="bg-transparent w-screen h-screen z-50 fixed justify-center items-center" style={{ display: open ? "flex" : "none" }} open={open}>
            <div className="flex flex-col gap-24 items-center justify-center w-full mt-12">
                <div className="max-w-[40rem] min-h-[15rem] mb-12 shadow-xl rounded-md mx-3 p-4 flex flex-col gap-4 items-center justify-center border bg-zinc-100 dark:bg-zinc-900">
                    <h1 className="font-semibold text-xl">{dictionary.beta.title}</h1>
                    <p>
                        {dictionary.beta.description}
                    </p>
                    <Button className="w-full" onClick={() => {
                        sessionStorage.setItem("beta-notification", "seen");
                        setOpen(false);
                    }}>
                        {dictionary.beta.startTesting}
                    </Button>
                </div>
            </div>
        </dialog>
    )
}