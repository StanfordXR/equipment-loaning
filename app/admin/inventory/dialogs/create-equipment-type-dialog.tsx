'use client'

import useAmplify from '@/app/hooks/use-amplify';
import generateClient from '@/app/utils/generate-client';
import CreateDialog from '@/components/dialogs/create-dialog'
import { TextInputWithLabel } from '@/components/primitives/interactions/text-input-with-label'
import { useState } from 'react'

export default function CreateEquipmentTypeDialog() {
    useAmplify();
    const [name, setName] = useState('');
    
    const createEquipmentType = async () => {
        const client = generateClient();
        const result = await client.models.EquipmentType.create({
            name
        });

        if (result.errors) {
            throw new Error(JSON.stringify(result.errors));
        }

        return true;
    }

    return (
        <CreateDialog
            name='Equipment Type'
            description={`
                An equipment type generally represents different types of headsets (e.g.
                Meta Quest, Snap Spectacles, etc.).
            `}
            onSubmit={createEquipmentType}
            canSubmit={name != ''}
        >
            <TextInputWithLabel
                inputID='equipment-type-name'
                label='Name'
                value={name}
                onChange={setName}
            />
        </CreateDialog>
    )
}