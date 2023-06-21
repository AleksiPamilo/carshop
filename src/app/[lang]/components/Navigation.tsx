"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { FaTimes, FaBars } from "react-icons/fa";
import Button from "./Button";
import { Dictionary } from "@/types/dictionary";
import SwitchLocale from "./SwitchLocale";

export default function Navigation({ dictionary }: {
    dictionary: Dictionary
}) {
    const pathname = usePathname();
    const currentLocale = pathname.split("/")[1];
    const [isMenuOpen, setIsMenuopen] = useState<boolean>(false);

    const handleIsMenuOpen = () => {
        setIsMenuopen(!isMenuOpen);
    };

    return (
        <>
            <nav className="max-md:hidden w-full flex justify-around items-center p-4 bg-light-primary dark:bg-dark-primary">
                <Link href={`${currentLocale}/`} locale={false}>
                    <Image src={Logo} alt="Logo" className="w-10" />
                </Link>

                <div className="flex gap-6">
                    <ul className="flex gap-5">
                        {
                            dictionary.navigation.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.path}>
                                        <span className={`text-white ${item.path === pathname ? "opacity-100" : "opacity-80"} hover:opacity-100`}>{item.label}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                    <Link href="/login">
                        <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            {dictionary.auth.signin}
                        </span>
                    </Link>
                </div>
            </nav>

            <div className="md:hidden flex w-full p-3 fixed z-50 justify-between items-center">
                <Link href={`${currentLocale}/`} locale={false}>
                    <Image src={Logo} alt="Logo" className="w-10" />
                </Link>

                <Button onClick={handleIsMenuOpen} style="text-3xl">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </Button>
            </div>

            <nav className={`z-40 md:hidden max-md:w-screen h-screen fixed transition-all duration-500 ${isMenuOpen ? "translate-x-0 bg-[rgba(0,0,0,0.7)]" : "-translate-x-full md:translate-x-0 bg-transparent"}`} onClick={handleIsMenuOpen}>
                <div className="flex flex-col gap-5 justify-center items-center h-full" onClick={e => e.stopPropagation()}>
                    {
                        dictionary.navigation.map((item) => (
                            <Link href={item.path} key={item.label} onClick={handleIsMenuOpen}>
                                <span className={`text-3xl text-white ${item.path === pathname ? "opacity-100" : "opacity-80"} hover:opacity-100`}>{item.label}</span>
                            </Link>
                        ))
                    }

                    <Link href="/login" className="text-3xl mt-2" onClick={handleIsMenuOpen}>
                        <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            {dictionary.auth.signin}
                        </span>
                    </Link>
                </div>

            </nav >
        </>
    )
}