"use client";

import { createContext, useContext } from "react";
import { IDictionary } from "@/interfaces/dictionary";

export const DictionaryContext = createContext<IDictionary | undefined>(undefined);

export const useDictionary = () => {
    const context = useContext(DictionaryContext);
    if (context === undefined) {
        throw new Error("useDictionary must be used within a DictionaryProvider");
    }
    return context;
};

export function DictionaryProvider({ dictionary, children }: {
    dictionary: IDictionary,
    children: React.ReactNode,
}) {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    );
}