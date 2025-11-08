import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export interface EquipmentSelectItem {
    eqiupmentTypeName: string;
    equipmentTypeId: string;
    equipmentId: string;
    isAvailable: boolean;
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
                <SelectGroup>
                    {items.map((item) =>
                        <SelectItem
                            value={item.equipmentId}
                            key={item.equipmentId}
                            disabled={!item.isAvailable && item.equipmentId != value}
                        >
                            <span className='font-bold'>{item.equipmentId}</span> ({item.eqiupmentTypeName})
                        </SelectItem>
                    )
                    }
                </SelectGroup>
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