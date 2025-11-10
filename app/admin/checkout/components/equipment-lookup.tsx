import generateClient from '@/app/utils/generate-client';
import handleError from '@/app/utils/handle-error';
import { TextInputWithLabel } from '@/components/primitives/interactions/text-input-with-label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { Equipment, equipmentSelectionSet } from '../equipment-config';
import { RequestStatus } from '@/amplify/data/constants';

interface EquipmentLookupProps {
    setEquipment: (val: Equipment) => void;
}

export default function EquipmentLookup({ setEquipment }: EquipmentLookupProps) {
    const [equipmentId, setEquipmentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (equipmentId == '') {
            return;
        }

        setIsLoading(true);

        const client = generateClient();
        const { data, errors } = await client.models.Equipment.get({ id: equipmentId }, {
            selectionSet: equipmentSelectionSet
        });

        if (errors) {
            handleError(errors);
        } else if (!data) {
            toast.warning('Equipment ID not found');
        } else if (!data.assignment) {
            toast.warning(`Equipment ${equipmentId} is not currently matched and cannot be checked out`);
        } else if (data.assignment.status != null && data.assignment.status != RequestStatus.CHECKED_OUT) {
            handleError(`Expected assignment request status to be one of null, CHECKED_OUT, but got ${data.assignment.status}`);
        } else {
            setEquipment(data);
        }

        setIsLoading(false);
    }

    return (
        <div className='flex flex-col gap-3'>
            <TextInputWithLabel
                inputID='checkout-equipment-id'
                label='Enter an equipment ID'
                description='Tip: use a barcode scanner for faster input'
                isRequired={true}
                value={equipmentId}
                onChange={setEquipmentId}
                autoFocus={true}
                onEnter={handleSubmit}
            />
            <Button
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        </div>
    )
}