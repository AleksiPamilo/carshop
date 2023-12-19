"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@/hooks';
import Button from './Button';
import { FaCaretDown } from 'react-icons/fa';

import styles from "@/styles/components/Dropdown.module.css";

type DropdownOption = {
    label: string,
} & (
        | {
            onClick: () => void,
        }
        | {
            href: string,
        }
    );

interface DropdownProps {
    label: { [key: number]: string | JSX.Element },
    options: DropdownOption[][],
    disabled?: boolean,
    selected?: { [key: number]: string } | null,
}

export default function DoubleDropdown({ label, options, disabled, selected: selectedItem }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<{ [key: number]: string | null }>({});
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useClickOutside(dropdownRef, () => setIsOpen(false));

    useEffect(() => {
        setSelected(selectedItem ? { 0: selectedItem[0], 1: selectedItem[1] } : { 0: null, 1: null });
    }, [selectedItem]);

    const buttonStyles = ["rounded-l-md", "rounded-r-md"];

    return (
        <div className="relative w-min" ref={dropdownRef}>
            <div className="flex divide-x-2 divide-gray-800">
                {buttonStyles.map((style, index) => (
                    <Button
                        key={index}
                        style={style + " inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-0 focus:ring-2 hover:ring-2 hover:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"}
                        disabled={disabled}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setActiveDropdown(index);
                        }}
                    >
                        {selectedItem?.[index] ? selected[index] : label[index]}
                        <FaCaretDown className="inline ml-2" />
                    </Button>
                ))}
            </div>
            {isOpen && (
                <ul className={"flex flex-col divide-y-2 divide-gray-600 absolute w-full max-h-[15rem] mt-2 bg-gray-800 rounded-md overflow-y-scroll overflow-x-hidden " + styles.dropdown}>
                    {activeDropdown !== null && options[activeDropdown]?.map((option: DropdownOption) => (
                        <Button
                            key={option.label}
                            style="block w-full py-2 px-3 text-sm first:rounded-t-md last:rounded-b-md text-gray-700 hover:bg-gray-700 first:rounded-tr-none last:rounded-br-none"
                            onClick={() => {
                                setIsOpen(false);
                                if (activeDropdown !== null) {
                                    setSelected(prevSelected => ({ ...prevSelected, [activeDropdown]: option.label }));
                                }

                                if ('onClick' in option) {
                                    option.onClick();
                                } else {
                                    router.push(option.href);
                                }
                            }}
                        >
                            <span className="text-white">{option.label}</span>
                        </Button>
                    ))}
                </ul>
            )}
        </div>
    );
}