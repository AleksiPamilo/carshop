import { cn } from "@/lib/utils";

export default function Input({ type, placeholder, className, required = false }: {
    type: string,
    placeholder?: string,
    className?: string,
    required?: boolean,
}) {
    return <input
        type={type ?? "text"}
        className={cn(
            "w-full p-2 rounded-md shadow-md bg-zinc-300 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 focus:border-zinc-400 focus:dark:border-zinc-700 focus:outline-0 placeholder:text-gray-500",
            className,
            required && "border-red-500",
        )}
        placeholder={`${placeholder} ${required ? "*" : ""}`}
        required={required}
    />
}