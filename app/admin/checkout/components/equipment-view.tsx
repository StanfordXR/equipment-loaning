import Attribute from '@/components/primitives/attribute';
import AttributeGrid from '@/components/primitives/attribute-grid';
import { Equipment } from '../equipment-config';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CheckboxWithDescription from '@/components/primitives/interactions/checkbox-with-description';
import { useState } from 'react';
import handleError from '@/app/utils/handle-error';
import generateClient from '@/app/utils/generate-client';
import { RequestStatus } from '@/amplify/data/constants';
import { toast } from 'sonner';

interface EquipmentViewProps {
    equipment: Equipment;
    onReset: () => void;
}

export default function EquipmentView({ equipment, onReset }: EquipmentViewProps) {
    // Assumed here that corresponding request status is either null or CHECKED_OUT,
    // and that assignment is nonnull

    const [isInfoConfirmed, setIsInfoConfirmed] = useState(false);
    const [isCollateralConfirmed, setIsCollateralConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const operation = (!equipment.assignment.status ? 'checkout' : 'return');

    const onSubmit = async () => {
        setIsLoading(true);

        const requestId = equipment.assignment.id;
        if (!requestId) {
            handleError('Expected nonnull requestId, but got null');
            setIsLoading(false);
            return;
        }

        if (operation == 'checkout') {
            await checkoutEquipment(requestId);
        } else {
            await returnEquipment(requestId);
        }
    };

    const checkoutEquipment = async (requestId: string) => {
        const client = generateClient();
        const { errors } = await client.models.Request.update({
            id: requestId,
            status: RequestStatus.CHECKED_OUT
        });

        if (errors) {
            handleError(errors);
            setIsLoading(false);
            return;
        }

        toast.success('Equipment successfully checked out');
        onReset();
    };

    const returnEquipment = async (requestId: string) => {
        const client = generateClient();
        const { errors } = await client.models.Request.update({
            id: requestId,
            status: RequestStatus.RETURNED,
            assignmentId: null
        });

        if (errors) {
            handleError(errors);
            setIsLoading(false);
            return;
        }

        toast.success('Equipment successfully returned');
        onReset();
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-y-3'>
                <AttributeGrid maxCols={2}>
                    <Attribute
                        label='Equipment Type'
                        value={equipment.equipmentType.name}
                    />
                    <Attribute
                        label='Equipment ID'
                        value={equipment.id}
                    />
                    <Attribute
                        label='Notes'
                        value={equipment.notes ?? 'N/A'}
                    />
                    <Attribute
                        label='Accessories'
                        value={
                            equipment.accessories && equipment.accessories.length > 0 ?
                                equipment.accessories?.join(', ')
                                : 'N/A'
                        }
                    />
                    <Attribute
                        label='Period'
                        value={equipment.assignment.period.name}
                    />
                    
                    <Attribute
                        label='User collateral'
                        value={equipment.assignment.collateralDescription}
                    />
                </AttributeGrid>

                <Alert>
                    <AlertCircleIcon />
                    <AlertTitle>
                        Equipment will be <span className='font-bold'>
                            {operation == 'checkout' ? 'checked out' : 'returned'}
                        </span>
                    </AlertTitle>
                </Alert>

            </div>

            <div className='flex flex-col gap-3'>
                <CheckboxWithDescription
                    inputID='checkout-info-confirm'
                    label={
                        operation == 'checkout' ?
                            `I've confirmed that the above information is correct`
                            : `I've confirmed that the equipment and accessories are accounted for`}
                    isRequired={true}
                    value={isInfoConfirmed}
                    onChange={(val) => {
                        if (val == 'indeterminate') {
                            handleError('Expected boolean for checkout-info-confirm state, but got indeterminate');
                        } else {
                            setIsInfoConfirmed(val)
                        }
                    }}
                />
                <CheckboxWithDescription
                    inputID='checkout-collateral-confirm'
                    label={
                        operation == 'checkout' ?
                            `The user's collateral has been received and securely stored`
                            : `The user's collateral has been returned`}
                    isRequired={true}
                    value={isCollateralConfirmed}
                    onChange={(val) => {
                        if (val == 'indeterminate') {
                            handleError('Expected boolean for checkout-collateral-confirm state, but got indeterminate');
                        } else {
                            setIsCollateralConfirmed(val)
                        }
                    }}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <Button
                    disabled={!isInfoConfirmed || !isCollateralConfirmed || isLoading}
                    onClick={onSubmit}
                >
                    {isLoading ? 'Loading...' : (
                        operation == 'checkout' ? 'Check out equipment' : 'Return equipment'
                    )}
                </Button>
                <Button variant='secondary' onClick={() => { onReset() }}>Cancel</Button>
            </div>
        </div>
    );
}