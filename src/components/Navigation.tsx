"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import NavigationData from "@/data/Navigation";
import { FaTimes, FaBars } from "react-icons/fa";
import Button from "./Button";

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuopen] = useState<boolean>(false);

    const handleIsMenuOpen = () => {
        setIsMenuopen(!isMenuOpen);
    };

    return (
        <>
            <nav className="max-md:hidden w-full flex justify-around items-center p-4 bg-light-primary dark:bg-dark-primary">
                <Link href="/">
                    <Image src={Logo} alt="Logo" className="w-10" />
                </Link>

                <div className="flex gap-6">
                    <ul className="flex gap-5">
                        {
                            NavigationData.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path}>
                                        <span className={`text-white ${item.path === pathname ? "opacity-100" : "opacity-80"} hover:opacity-100`}>{item.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                    <Link href="/login">
                        <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Login
                        </span>
                    </Link>
                </div>
            </nav>

            <Button onClick={handleIsMenuOpen} style="md:hidden fixed top-4 right-4 z-50 text-3xl">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </Button>

            <nav className={`z-40 md:hidden max-md:w-screen h-screen fixed transition-all duration-500 ${isMenuOpen ? "translate-x-0 bg-[rgba(0,0,0,0.7)]" : "-translate-x-full md:translate-x-0 bg-transparent"}`} onClick={handleIsMenuOpen}>
                <div className="flex flex-col gap-5 justify-center items-center h-full" onClick={e => e.stopPropagation()}>
                    {
                        NavigationData.map((item) => (
                            <Link href={item.path} key={item.name} onClick={handleIsMenuOpen}>
                                <span className={`text-3xl text-white ${item.path === pathname ? "opacity-100" : "opacity-80"} hover:opacity-100`}>{item.name}</span>
                            </Link>
                        ))
                    }

                    <Link href="/login" className="text-3xl mt-2" onClick={handleIsMenuOpen}>
                        <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Login
                        </span>
                    </Link>
                </div>

            </nav >
        </>
    )
}