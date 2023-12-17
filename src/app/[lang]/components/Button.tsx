export default function Button({ children, onClick, type, style, disabled }: {
    children: React.ReactNode,
    onClick: () => void,
    type?: "button" | "submit" | "reset",
    style?: string,
    disabled?: boolean,
}) {
    const defaultStyle = "inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-0 focus:ring-2 hover:ring-2 hover:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"

    return (
        <button
            type={type ? type : "button"}
            className={style ? style : defaultStyle}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}