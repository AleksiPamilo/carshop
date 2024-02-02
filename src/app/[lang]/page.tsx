"use client";

import SearchCar from "@/components/search/SearchCar";
import { useDictionary } from "@/hooks";

export default function IndexPage() {
  const dictionary = useDictionary();
  return (
    <div>
      <SearchCar />
      <div className="flex flex-col gap-24 items-center justify-center w-full mt-12">
        <p>TODO: Update this page</p>

        <div className="max-w-[40rem] min-h-[15rem] shadow-xl rounded-md mx-3 p-4 flex flex-col gap-4 items-center justify-center bg-zinc-100 dark:bg-zinc-900">
          <h1 className="font-semibold text-xl">{dictionary.beta.title}</h1>
          <p>
            {dictionary.beta.description}
          </p>
        </div>
      </div>
    </div>
  )
}