export default function Input({ type, placeholder, style, required = false }: {
    type: string,
    placeholder?: string,
    style?: string,
    required?: boolean,
}) {
    const inputStyle = style ?? `w-full p-2 rounded-md shadow-md bg-zinc-300 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 focus:border-zinc-400 focus:dark:border-zinc-700 focus:outline-0 placeholder:text-gray-500
    ${required && "border-red-500"}`;

    return <input
        type={type ?? "text"}
        className={inputStyle}
        placeholder={`${placeholder} ${required ? "*" : ""}`}
        required={required}
    />
}