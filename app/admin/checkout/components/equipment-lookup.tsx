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
    setUserDisplayName: (val: string) => void;
}

const FALLBACK_DISPLAY_NAME = 'USERNAME NOT FOUND';

export default function EquipmentLookup({ setEquipment, setUserDisplayName }: EquipmentLookupProps) {
    const [equipmentId, setEquipmentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (equipmentId == '') {
            return;
        }

        setIsLoading(true);

        const client = generateClient();
        const equipment = await client.models.Equipment.get({ id: equipmentId }, {
            selectionSet: equipmentSelectionSet
        });

        if (equipment.errors) {
            handleError(equipment.errors);
        } else if (!equipment.data) {
            toast.warning('Equipment ID not found');
        } else if (!equipment.data.assignment) {
            toast.warning(`Equipment ${equipmentId} is not currently matched and cannot be checked out`);
        } else if (equipment.data.assignment.status != null && equipment.data.assignment.status != RequestStatus.CHECKED_OUT) {
            handleError(`Expected assignment request status to be one of null, CHECKED_OUT, but got ${equipment.data.assignment.status}`);
        } else {
            let displayName = FALLBACK_DISPLAY_NAME;

            const username = equipment.data.assignment.owner;
            if (username) {
                displayName = await getUserDisplayName(username, client);
            }

            setUserDisplayName(displayName);
            setEquipment(equipment.data);
        }
        setIsLoading(false);
    }

    const getUserDisplayName = async (username: string, client: ReturnType<typeof generateClient>) => {
        const userDisplayName = await client.queries.getUserDisplayNames({ usernames: [username] });

        if (userDisplayName.errors) {
            handleError(userDisplayName.errors);
        } else if (!userDisplayName.data) {
            toast.warning('Expected nonnull user display name data, but got null');
        } else if (userDisplayName.data.length != 1) {
            toast.warning(`Expected exactly one user display name return value, but got ${userDisplayName.data.length}`);
        } else {
            return userDisplayName.data[0]?.displayName ?? FALLBACK_DISPLAY_NAME;
        }

        return FALLBACK_DISPLAY_NAME;
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