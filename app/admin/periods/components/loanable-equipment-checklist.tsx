'use client'
import generateClient from '@/app/utils/generate-client';
import handleError from '@/app/utils/handle-error';
import CheckboxWithDescription from '@/components/primitives/interactions/checkbox-with-description';
import Subtext from '@/components/primitives/text/subtext';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';


interface LoanableEquipmentChecklistProps {
    onChange: (equipmentIds: string[]) => void;  // write only
}

type EquipmentTypeAndEquipment = {
    id: string;
    name: string;
    equipmentIds: string[];
}

export default function LoanableEquipmentChecklist({ onChange }: LoanableEquipmentChecklistProps) {
    const client = generateClient();
    const [equipmentByTypes, setEquipmentByTypes] = useState<EquipmentTypeAndEquipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>([]);

    useEffect(() => {
        onChange(selectedEquipmentIds);
    }, [selectedEquipmentIds]);

    useEffect(() => {
        const getEquipmentTypesAndEquipment = async () => {
            const { data, errors } = await client.models.EquipmentType.list({
                selectionSet: ['id', 'name', 'equipments.id']
            });

            if (errors) {
                console.error(errors);
                handleError(errors);
                return;
            }

            setEquipmentByTypes(data.reduce<EquipmentTypeAndEquipment[]>((previous, { id, name, equipments }) => {
                const equipmentIds = equipments.map(e => e.id);
                if (equipmentIds.length > 0) {  // filter EquipmentTypes with no Equipment
                    previous.push({ id, name, equipmentIds });
                }
                return previous;
            }, []));
            setIsLoading(false);
        }

        getEquipmentTypesAndEquipment();
    }, []);

    const checkEquipmentIdsIfNotAlready = (equipmentIds: string[]) => {
        let addedEquipmentIds: string[] = [];
        equipmentIds.map((e) => {
            if (!selectedEquipmentIds.includes(e)) {
                addedEquipmentIds.push(e);
            }
        });
        setSelectedEquipmentIds(selectedEquipmentIds.concat(addedEquipmentIds));
    }

    const uncheckEquipmentIdsIfNotAlready = (equipmentIds: string[]) => {
        setSelectedEquipmentIds(selectedEquipmentIds.filter(
            (id) => !equipmentIds.includes(id)
        ));
    }

    if (isLoading) {
        return (
            <Subtext>
                Loading equipment...
            </Subtext>
        );
    }

    return (
        <div className='max-h-[350px] overflow-auto py-1'>
            {equipmentByTypes.map((equipmentType) => {
                const numEquipmentsSelected = equipmentType.equipmentIds.filter(
                    (equipmentId) => selectedEquipmentIds.includes(equipmentId)
                );

                let checkedState: CheckedState;
                if (numEquipmentsSelected.length == equipmentType.equipmentIds.length) {
                    checkedState = true;
                } else if (numEquipmentsSelected.length > 0) {
                    checkedState = 'indeterminate';
                } else {
                    checkedState = false;
                }


                return (
                    <div key={equipmentType.id} className='mb-2'>
                        <div>
                            <CheckboxWithDescription
                                inputID={`loanable-equipment-checklist-equipment-type-${equipmentType.id}`}
                                label={equipmentType.name}
                                value={checkedState}
                                onChange={(val) => {
                                    if (val == 'indeterminate') {
                                        handleError('Expected non-indeterminate new checked state for EquipmentType checkbox, but got indeterminate');
                                    } else if (val) {
                                        checkEquipmentIdsIfNotAlready(equipmentType.equipmentIds);
                                    } else {
                                        uncheckEquipmentIdsIfNotAlready(equipmentType.equipmentIds);
                                    }
                                }} />
                        </div>

                        <div className='ms-6'>
                            {
                                equipmentType.equipmentIds.map((equipmentId) => {
                                    return (
                                        <div key={equipmentId} className='py-1'>
                                            <CheckboxWithDescription
                                                inputID={`loanable-equipment-checklist-equipment-${equipmentId}`}
                                                label={equipmentId}
                                                value={selectedEquipmentIds.includes(equipmentId)}
                                                onChange={(val) => {
                                                    if (val == 'indeterminate') {
                                                        handleError('Expected non-indeterminate new checked state for Equipment checkbox, but got indeterminate');
                                                    } else if (val) {
                                                        setSelectedEquipmentIds(selectedEquipmentIds.concat([equipmentId]));
                                                    } else {
                                                        setSelectedEquipmentIds(selectedEquipmentIds.filter((id) => id != equipmentId));
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}