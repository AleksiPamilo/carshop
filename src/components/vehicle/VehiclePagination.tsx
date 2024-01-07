import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useDictionary } from "../context/DictionaryProvider";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function VehiclePagination({ page, pageAmount, router }: {
    page: number,
    pageAmount: number,
    router: AppRouterInstance
}) {
    const pathname = usePathname();
    const dictionary = useDictionary();

    return (
        <div className="flex gap-2 items-center">
            {page > 1 && <Button variant="ghost" onClick={() =>
                router.push(pathname + "?page=" + Math.max(page - 1, 1))
            }>
                <ChevronLeft />
                {dictionary.common.previous}
            </Button>}
            {pageAmount > 5 && page > 3 && <Button variant="ghost" onClick={() => router.push(pathname + "?page=1")}>...</Button>}
            {Array.from({ length: Math.min(5, pageAmount) }, (_, i) => {
                const pageNumber = page < 3 ? i + 1 : page > pageAmount - 2 ? pageAmount - 4 + i : page - 2 + i;
                return (
                    <Button
                        variant={pageNumber === page ? "secondary" : "outline"}
                        key={pageNumber}
                        onClick={() => router.push(pathname + "?page=" + pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
            {pageAmount > 5 && page < pageAmount - 2 && <Button variant="ghost" onClick={() => router.push(pathname + "?page=" + pageAmount)}>...</Button>}
            {page < pageAmount && <Button variant="ghost" onClick={() => router.push(pathname + "?page=" + (page + 1))}>
                {dictionary.common.next}
                <ChevronRight />
            </Button>}
        </div>
    )
}