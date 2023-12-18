"use client";

import { useDictionary } from '@/hooks';
import SearchCar from './components/SearchCar';

export default async function IndexPage() {
    const dictionary = useDictionary();

    return (
        <div>
            <SearchCar dictionary={dictionary} />
        </div>
    )
}