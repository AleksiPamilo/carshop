import AccordionSection from "./AccordionSection";
import { useDictionary } from "./context/DictionaryProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

import type { IBasicInfo, ITechnicalInfo } from "@/interfaces/vehicle";

export default function SellVehicleForm() {
    const dictionary = useDictionary();

    const sections = [
        {
            data: generateSectionData(Object.keys(dictionary.vehicles.basicInfo), dictionary, dictionary.vehicles.basicInfo.title)
        },
        {
            data: generateSectionData(Object.keys(dictionary.vehicles.techInfo), dictionary, dictionary.vehicles.techInfo.title)
        }
    ];

    return (
        <Accordion type="single" collapsible>
            {sections.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{section.data.title}</AccordionTrigger>
                    <AccordionContent>
                        <AccordionSection title={section.data.title} inputs={section.data.inputs} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

function generateSectionData(columns: string[], dictionary: any, title: string) {
    return {
        title: title,
        inputs: generateInputs(columns, dictionary)
    };
}

function generateInputs(columns: string[], dictionary: any): any[] {
    const inputs: any[] = [];
    for (const key of columns) {
        if (key !== 'id' && key !== 'features' && key !== 'title') {
            const isNumeric = isNumericColumn(key);
            const localizedLabel = dictionary.vehicles.techInfo[key] ?? dictionary.vehicles.basicInfo[key];

            inputs.push({
                label: localizedLabel,
                name: key,
                type: isNumeric ? 'number' : 'text'
            });
        }
    }

    return inputs;
}

function isNumericColumn(column: string): boolean {
    return column in ({} as IBasicInfo) || column in ({} as ITechnicalInfo);
}