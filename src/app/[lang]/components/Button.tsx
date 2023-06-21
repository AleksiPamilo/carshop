export default function Button({ children, onClick, type, style }: {
    children: React.ReactNode,
    onClick: () => void,
    type?: "button" | "submit" | "reset",
    style?: string,
}) {
    const defaultStyle = "inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none hover:ring-2 hover:ring-indigo-500"

    return (
        <button
            type={type ? type : "button"}
            className={style ? style : defaultStyle}
            onClick={onClick}
        >
            {children}
        </button>
    );
}