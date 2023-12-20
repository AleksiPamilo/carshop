"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import FiIcon from "@/assets/fi.svg";
import GbIcon from "@/assets/gb.svg";
import Image from "next/image";
import { useDictionary } from "@/hooks";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SwitchLocale() {
    const pathname = usePathname();
    const dictionary = useDictionary();

    const currentLang = pathname.split("/")[1];
    const redirectedPathName = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    }

    const localeIcons: { [key: string]: JSX.Element } = {
        fi: <Image src={FiIcon} alt="" width={24} height={24} />,
        en: <Image src={GbIcon} alt="" width={24} height={24} />
    }

    const data = Object.keys(dictionary.locales).map((locale) => ({
        locale,
        path: redirectedPathName(locale),
        icon: localeIcons[locale],
    }));
    const filteredData = data.filter(lang => lang.locale !== currentLang);

    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-0">
                {data.find(item => item.locale === currentLang)?.icon}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-full items-center justify-center">
                {
                    filteredData.map((item, index) => (
                        <div key={item.locale}>
                            <DropdownMenuItem>
                                <DropdownMenuLabel>
                                    <Link href={item.path}>
                                        <span>{item.icon}</span>
                                    </Link>
                                </DropdownMenuLabel>
                            </DropdownMenuItem>
                            {index < filteredData.length - 1 && <DropdownMenuSeparator />}
                        </div>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}