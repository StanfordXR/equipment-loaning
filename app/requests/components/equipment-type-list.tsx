
import { Period } from '../period-config';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InputLabel from '@/components/primitives/interactions/input-label';
import { EquipmentTypeIdentifier } from '../types';
import getUserRankLabel from '@/app/utils/get-user-rank-label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface EquipmentTypeList {
    period: Period;
    selectedEquipmentTypeIds: string[];
    setSelectedEquipmentTypeIds: (val: string[]) => void;
}

export default function EquipmentTypeList({ period, selectedEquipmentTypeIds, setSelectedEquipmentTypeIds }: EquipmentTypeList) {
    let loanableEquipmentTypes: EquipmentTypeIdentifier[] = [];
    period.loanableEquipment
        .map(l => l.equipment)
        .map(e => {
            if (!loanableEquipmentTypes.find(a => a.equipmentTypeId == e.equipmentType.id)) {
                loanableEquipmentTypes.push({
                    equipmentTypeId: e.equipmentType.id,
                    equipmentTypeName: e.equipmentType.name
                })
            }
        });

    return (
        <>
            <div className='flex flex-col gap-3'>
                <InputLabel
                    label='Equipment'
                    description={`
                        Choose the equipment that you wish to use and rank them based on
                        preference. You will only receive one piece of equipment. Ranking many
                        equipments is recommended to increase the likelihood that you receive equipment.
                    `}
                >
                    <div className='flex flex-col gap-3'>
                        {selectedEquipmentTypeIds.map((selectedEquipmentTypeId, index) =>
                            <div className='flex flex-col gap-1' key={index}>
                                <div className='text-sm'>
                                    {getUserRankLabel(index + 1)} choice:
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Select
                                        value={selectedEquipmentTypeId}
                                        onValueChange={(val) => {
                                            let result = [...selectedEquipmentTypeIds];
                                            result[index] = val;
                                            setSelectedEquipmentTypeIds(result);
                                        }}
                                    >
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder='Select an equipment...' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {loanableEquipmentTypes.map(({ equipmentTypeId, equipmentTypeName }) =>
                                                    <SelectItem
                                                        value={equipmentTypeId}
                                                        key={equipmentTypeId}
                                                        disabled={
                                                            equipmentTypeId != selectedEquipmentTypeId &&
                                                            selectedEquipmentTypeIds.includes(equipmentTypeId)
                                                        }
                                                    >{equipmentTypeName}</SelectItem>
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        disabled={index == 0}
                                        onClick={() => {
                                            const val = selectedEquipmentTypeId;
                                            let result = [...selectedEquipmentTypeIds];
                                            result.splice(index, 1);
                                            result.splice(index - 1, 0, val);
                                            setSelectedEquipmentTypeIds(result);
                                        }}
                                    >
                                        <ChevronUp />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        disabled={index == selectedEquipmentTypeIds.length - 1}
                                        onClick={() => {
                                            const val = selectedEquipmentTypeId;
                                            let result = [...selectedEquipmentTypeIds];
                                            result.splice(index, 1);
                                            result.splice(index + 1, 0, val);
                                            setSelectedEquipmentTypeIds(result);
                                        }}
                                    >
                                        <ChevronDown />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => {
                                            let result = [...selectedEquipmentTypeIds];
                                            result.splice(index, 1);
                                            setSelectedEquipmentTypeIds(result);
                                        }}
                                    >
                                        <X />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </InputLabel>
                <Button
                    variant='secondary'
                    onClick={() => setSelectedEquipmentTypeIds([...selectedEquipmentTypeIds, ''])}
                    disabled={selectedEquipmentTypeIds.length == loanableEquipmentTypes.length}
                >Add Equipment</Button>
            </div>
        </>
    );
}