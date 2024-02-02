import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "./context/DictionaryProvider";

export default function Breadcrumbs() {
    const dictionary = useDictionary();
    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((x) => x);
    pathnames.shift();

    if (pathnames.length === 3) {
        pathnames[2] = dictionary.common.salesAd;
    }

    return (
        <div className="flex w-full justify-start md:justify-center items-center">
            <div className="md:w-[80%] pl-4 flex items-center gap-2 capitalize text-xs md:text-sm">
                <Link href="/">{dictionary.navigation[0].label}</Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return index === pathnames.length - 1 ? (
                        <span className="flex items-center">
                            <ChevronRight className="p-0.5" />
                            {value}
                        </span>
                    ) : (
                        <Link key={to} href={to} className="flex items-center">
                            <ChevronRight className="p-0.5" />
                            {value}
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}