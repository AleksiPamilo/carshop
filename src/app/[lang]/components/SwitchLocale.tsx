"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./Button";
import FiIcon from "@/assets/fi.svg";
import GbIcon from "@/assets/gb.svg";
import Image from "next/image";
import { IDictionary } from "@/interfaces/dictionary";
import { Locale } from "../../../../i18n-config";

export default function SwitchLocale({ dictionary }: { dictionary: IDictionary }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const currentLang = pathname.split("/")[1];
    const redirectedPathName = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    }

    // TODO:
    const data = Object.keys(dictionary.locales).map((locale) => {
        return {
            locale,
            localeName: dictionary.locales[locale as Locale],
            path: redirectedPathName(locale),
            icon: locale === "fi"
                ? <Image src={FiIcon} alt="" width={20} height={20} />
                : <Image src={GbIcon} alt="" width={20} height={20} />
        }
    });

    return (
        <div className="">
            <Button style="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {data.find(item => item.locale === currentLang)?.icon}
            </Button>
            {isMenuOpen && (
                <div className="absolute w-screen h-screen z-20" onClick={() => setIsMenuOpen(false)}>
                    <div className="max-w-[20rem] top-0 left-0 mt-12 bg-gray-800 rounded-md shadow-lg z-10" onClick={e => e.stopPropagation()}>
                        {
                            data.map(item => (
                                <Link href={item.path} key={item.locale} className="flex items-center p-4 py-2 hover:bg-gray-600 first:rounded-t-md last:rounded-b-md" onClick={() => setIsMenuOpen(false)}>
                                    {item.icon}
                                    <span className="ml-2">{item.localeName}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}