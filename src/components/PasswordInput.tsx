import React, { useState } from "react";
import { useDictionary } from "./context/DictionaryProvider";
import { Input } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps {
    label?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dictionary = useDictionary();

    return (
        <div className="relative">
            <Input
                {...props}
                ref={ref}
                type={showPassword ? "text" : "password"}
                placeholder={label ?? dictionary.auth.password}
            />
            <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-zinc-600 text-xl"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    );
});

export default PasswordInput;