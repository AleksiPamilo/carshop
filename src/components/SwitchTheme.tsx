"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun, FaCog } from "react-icons/fa";

export default function SwitchTheme() {
    const theme = useTheme();
    const [emoji, setEmoji] = useState<JSX.Element>(<FaCog className="text-2xl" />);

    let style = "text-2xl"

    useEffect(() => {
        switch (theme.theme) {
            case "dark":
                setEmoji(<FaMoon className={style} />)
                break;
            case "light":
                setEmoji(<FaSun className={style} />)
                break;
            default:
                setEmoji(<FaCog className={style} />)
                break;
        }
    }, [theme.theme])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-0">
                {emoji}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <DropdownMenuLabel onClick={() => {
                        theme.setTheme("light");
                    }}>
                        Light
                    </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <DropdownMenuLabel onClick={() => {
                        theme.setTheme("dark");
                    }}>
                        Dark
                    </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <DropdownMenuLabel onClick={() => {
                        theme.setTheme("system");
                    }}>
                        System
                    </DropdownMenuLabel>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}