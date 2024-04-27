import { basicInfoInputs, techInfoInputs } from "@/data/inputs";
import AccordionSection from "./AccordionSection";
import { useDictionary } from "./context/DictionaryProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";

export default function SellVehicleForm() {
    const dictionary = useDictionary();

    const sections = [
        {
            title: dictionary.vehicles.basicInfo.title,
            inputs: basicInfoInputs.map(input => ({
                ...input,
                label: (dictionary.vehicles.basicInfo as Record<string, string>)[input.name],
            }))
        },
        {
            title: dictionary.vehicles.techInfo.title,
            inputs: techInfoInputs.map(input => ({
                ...input,
                label: (dictionary.vehicles.techInfo as Record<string, string>)[input.name],
            }))
        }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Accordion type="single" collapsible>
                {sections.map((section, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{section.title}</AccordionTrigger>
                        <AccordionContent>
                            <AccordionSection title={section.title} inputs={section.inputs} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button className="w-full">{dictionary.common.createAd}</Button>
        </div>
    );
};
