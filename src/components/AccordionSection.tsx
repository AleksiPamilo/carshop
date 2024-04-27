import {
    AccordionContent,
} from "@/components/ui/accordion";
import Input from "./Input";

export default function AccordionSection({ title, inputs }: {
    title: string;
    inputs: {
        label: string;
        name: string;
        type: string;
        required: boolean;
    }[]
}) {
    return (
        <AccordionContent className="flex flex-col gap-3">
            {inputs.map(input => (
                <label key={input.name}>
                    <Input type={input.type} placeholder={input.label} required={input.required} />
                </label>
            ))}
        </AccordionContent>
    );
};