"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { useDictionary } from "@/hooks";
import SwitchTheme from "./SwitchTheme";
import SwitchLocale from "./SwitchLocale";
import { Button } from "./ui/button";
import { FaBars, FaTimes } from "react-icons/fa";
import Login from "./auth/Login";

export default function Navigation() {
    const dictionary = useDictionary();
    const pathname = usePathname();
    const currentLocale = pathname.split("/")[1];
    const [isMenuOpen, setIsMenuopen] = useState<boolean>(false);


    const handleIsMenuOpen = () => {
        setIsMenuopen(!isMenuOpen);
    };

    return (
        <>
            <nav className="max-md:hidden w-full flex justify-around items-center p-4 bg-light-primary dark:bg-dark-primary">
                <Link href={`/${currentLocale}/`} locale={false}>
                    <Image src={Logo} alt="Logo" className="w-10" />
                </Link>

                <div className="flex items-center gap-6">
                    <SwitchLocale />
                    <SwitchTheme />
                    <Login />
                </div>
            </nav>

            <div className="md:hidden flex w-full p-3 top-2 fixed z-[60] justify-between items-center">
                <Link href={`/${currentLocale}/`} locale={false}>
                    <Image src={Logo} alt="Logo" className="w-10" />
                </Link>

                <Button onClick={handleIsMenuOpen} className="text-3xl">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </Button>
            </div>

            <nav className={`z-50 md:hidden max-md:w-screen h-screen fixed transition-all duration-500 ${isMenuOpen ? "translate-x-0 bg-[rgba(0,0,0,0.7)]" : "-translate-x-full md:translate-x-0 bg-transparent"}`} onClick={handleIsMenuOpen}>
                <div className="flex flex-col gap-5 justify-center items-center h-full" onClick={e => e.stopPropagation()}>
                    {
                        dictionary.navigation.map((item) => (
                            <Link href={item.path} key={item.label} onClick={handleIsMenuOpen}>
                                <span className={`text-3xl text-white ${item.path === pathname ? "opacity-100" : "opacity-80"} hover:opacity-100`}>{item.label}</span>
                            </Link>
                        ))
                    }
                    <Login />
                </div>
            </nav >
        </>
    )
}