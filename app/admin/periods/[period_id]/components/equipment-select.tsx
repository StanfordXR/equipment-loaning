import { Badge } from '@/components/ui/badge';
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
    }[];
    userRank?: number;
}

interface EquipmentSelectProps {
    items: EquipmentSelectItem[];
    value: string | undefined;  // equipmentId
    onChange: (equipmentId: string) => void;
    onClearValue: () => void;
}

const getUserRankLabel = (rank: number) => {
    // Expects rank >= 1
    switch (rank) {
        case 1:
            return '1st';
        case 2:
            return '2nd';
        case 3:
            return '3rd';
        default:
            return `${rank}th`;
    }
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
                        <SelectLabel className='flex items-center gap-2'>
                            <div className='uppercase'>{equipmentType.eqiupmentTypeName}</div>
                            {equipmentType.userRank &&
                                <Badge variant='secondary'>User&apos;s {getUserRankLabel(equipmentType.userRank + 1)} choice</Badge>
                            }
                        </SelectLabel>
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