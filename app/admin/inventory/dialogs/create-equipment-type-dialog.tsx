'use client'

import generateClient from '@/app/utils/generate-client';
import CreateDialog from '@/components/dialogs/create-dialog'
import { TextInputWithLabel } from '@/components/primitives/interactions/text-input-with-label'
import { useState } from 'react'

export default function CreateEquipmentTypeDialog() {
    const [name, setName] = useState('');

    const createEquipmentType = () => new Promise<void>(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 1000);
    });
    
    // const client = generateClient();
    // const result = await client.models.EquipmentType.create({
    //     name
    // });

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