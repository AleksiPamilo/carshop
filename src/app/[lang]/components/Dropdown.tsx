"use client";

import React, { useState, useRef } from 'react';
import { useClickOutside } from '@/hooks';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { FaCaretDown } from 'react-icons/fa';

import styles from "@/styles/components/Dropdown.module.css";

type DropdownOptions = {
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
    label: string | JSX.Element,
    options: DropdownOptions[],
    disabled?: boolean,
    selected?: string | null,
}

export default function Dropdown({ label, options, disabled, selected: selectedItem }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div className="relative" ref={dropdownRef}>
            <Button disabled={disabled} onClick={() => setIsOpen(!isOpen)}>
                {selectedItem ? selected : label}
                <FaCaretDown className="ml-2" />
            </Button>
            {isOpen && (
                <ul className={"flex flex-col divide-y-2 divide-gray-600 absolute w-full max-h-[15rem] mt-2 bg-gray-800 rounded-md overflow-y-scroll overflow-x-hidden " + styles.dropdown}>
                    {options.map((option) => (
                        <button
                            key={option.label}
                            className="block w-full py-2 px-3 text-sm first:rounded-t-md last:rounded-b-md text-gray-700 hover:bg-gray-700 first:rounded-tr-none last:rounded-br-none"
                            onClick={() => {
                                setIsOpen(false);
                                setSelected(option.label);

                                if ('onClick' in option) {
                                    option.onClick();
                                } else {
                                    router.push(option.href);
                                }
                            }}
                        >
                            <span className="text-white">{option.label}</span>
                        </button>
                    ))}
                </ul>
            )}
        </div>
    );
};