import { Separator } from "../ui/separator";

export default function VehicleDetail({ label, value, separator }: {
    label: string;
    value: string | number;
    separator?: boolean
}) {
    return (
        <>
            <div className="flex-grow flex-shrink">
                <div className="flex justify-between items-center">
                    <p>{label}</p>
                    <p>{value}</p>
                </div>
            </div>
            {separator && <Separator />}
        </>
    );
};