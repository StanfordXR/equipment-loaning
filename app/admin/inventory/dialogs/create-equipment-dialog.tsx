'use client'

import useAmplify from '@/app/hooks/use-amplify';
import generateClient from '@/app/utils/generate-client';
import CreateDialog from '@/components/dialogs/create-dialog'
import { TextInputWithLabel } from '@/components/primitives/interactions/text-input-with-label'
import { useState } from 'react'

export default function CreateEquipmentDialog() {
    useAmplify();
    const [name, setName] = useState('');
    
    const createEquipment = async () => {
        // const client = generateClient();
        // const result = await client.models.Equipment.create({
        //     name
        // });

        // if (result.errors) {
        //     throw new Error(JSON.stringify(result.errors));
        // }
        alert('creating equipment');
    }

    return (
        <CreateDialog
            name='Equipment'
            description={`
                A single piece of equipment that can be loaned out, labeled with a unique identifier.
                Equipment can also be associated with a list of accessories.
            `}
            onSubmit={createEquipment}
            canSubmit={name != ''}
        >
            <TextInputWithLabel
                inputID='equipment-name'
                label='Name'
                value={name}
                onChange={setName}
            />
        </CreateDialog>
    )
}