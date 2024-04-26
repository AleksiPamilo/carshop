"use client";

import Showcase from "@/components/Showcase";
import SearchCar from "@/components/search/SearchCar";

export default function IndexPage() {
  return (
    <div>
      <SearchCar />
      <div className="flex w-full items-center justify-center py-24">
        <Showcase />
      </div>
    </div>
  )
}