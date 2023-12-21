import { IModel } from "@/interfaces/vehicle";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDictionary } from "../context/DictionaryProvider";

export default function ModelDropdown({ models, currentModel, disabled, onChange }: {
    models: IModel[],
    currentModel: IModel | null,
    onChange: (brand: IModel | null) => void,
    disabled?: boolean,
}) {
    const dictionary = useDictionary();

    return (
        <Select disabled={disabled} value={currentModel?.name} onValueChange={(value) => {
            const model = models.find(model => model.name === value);
            onChange(model ?? null);
        }}>
            <SelectTrigger className="w-[10rem]">
                <SelectValue placeholder={dictionary.vehicles.model}>
                    {currentModel?.name ?? dictionary.vehicles.model}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key="unselected"
                    value="unselected"
                >
                    {dictionary.vehicles.model}
                </SelectItem>

                {models.map(model => (
                    <SelectItem
                        key={model.id}
                        value={model.name}
                    >
                        {model.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}