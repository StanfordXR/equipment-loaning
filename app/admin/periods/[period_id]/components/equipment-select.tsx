import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'


export interface EquipmentSelectItem {
    eqiupmentTypeName: string;
    equipmentTypeId: string;
    equipments: {
        equipmentId: string;
        isAvailable: boolean;
    }[]
}

interface EquipmentSelectProps {
    items: EquipmentSelectItem[];
    value: string | undefined;  // equipmentId
    onChange: (equipmentId: string) => void;
    onClearValue: () => void;
}

export default function EquipmentSelect({ value, items, onChange, onClearValue }: EquipmentSelectProps) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className='w-full'>
                <SelectValue placeholder='No equipment selected' />
            </SelectTrigger>
            <SelectContent>
                {items.map((equipmentType) =>
                    <SelectGroup key={equipmentType.equipmentTypeId} className='mb-3'>
                        <SelectLabel className='uppercase'>{equipmentType.eqiupmentTypeName}</SelectLabel>
                        {equipmentType.equipments.map((equipment) => {
                            return <SelectItem
                                value={equipment.equipmentId}
                                key={equipment.equipmentId}
                                disabled={!equipment.isAvailable && equipment.equipmentId != value}
                            >
                                {equipment.equipmentId}
                            </SelectItem>
                        })}
                    </SelectGroup>
                )}
                <Button
                    className='w-full mt-2'
                    variant='outline'
                    size='sm'
                    onClick={onClearValue}
                >
                    Clear selection
                </Button>
            </SelectContent>
        </Select >
    );
}