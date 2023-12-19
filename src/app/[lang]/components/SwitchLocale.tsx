"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./Button";
import FiIcon from "@/assets/fi.svg";
import GbIcon from "@/assets/gb.svg";
import Image from "next/image";
import { IDictionary } from "@/interfaces/dictionary";
import { useClickOutside } from "@/hooks";

export default function SwitchLocale({ dictionary }: { dictionary: IDictionary }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsMenuOpen(false));

    const currentLang = pathname.split("/")[1];
    const redirectedPathName = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    }

    const localeIcons: { [key: string]: JSX.Element } = {
        fi: <Image src={FiIcon} alt="" width={20} height={20} />,
        en: <Image src={GbIcon} alt="" width={20} height={20} />
    }

    const data = Object.keys(dictionary.locales).map((locale) => ({
        locale,
        path: redirectedPathName(locale),
        icon: localeIcons[locale],
    }));

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <Button style="text-white font-bold shadow-[0_0_1px_1px_gray] py-2 px-4 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {data.find(item => item.locale === currentLang)?.icon}
            </Button>
            {isMenuOpen && (
                <div className="absolute mt-2 z-20" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex shadow-[0_0_1px_1px_gray] bg-gray-700 rounded-md" onClick={e => e.stopPropagation()}>
                        {
                            data.filter(lang => lang.locale !== currentLang).map(item => (
                                <Link href={item.path} key={item.locale} className="py-2 px-4" onClick={() => setIsMenuOpen(false)}>
                                    <span>{item.icon}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}