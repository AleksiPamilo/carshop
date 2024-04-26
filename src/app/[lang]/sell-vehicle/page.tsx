"use client";

import SellVehicleForm from "@/components/SellVehicleForm";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useDictionary } from "@/hooks";

export default function SellVehicle() {
    const dictionary = useDictionary();

    return (
        <div className="flex flex-col w-full pt-36 items-center justify-center">
            <div className="flex flex-col gap-4 w-4/5 p-4 rounded-md bg-zinc-900 border border-zinc-800">
                <h1 className="text-3xl font-semibold">{dictionary.common.salesAd}</h1>

                <SellVehicleForm />
            </div>
        </div>
    )
}