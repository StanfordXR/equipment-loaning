'use client'

import DataTable from '@/components/data-table/data-table'
import { type EquipmentType, equipmentTypeColumns } from './equipment-type-config'
import Header from '@/components/primitives/text/header';
import CreateEquipmentTypeDialog from '../dialogs/create-equipment-type-dialog';

interface EquipmentTypeTableProps {
    data: EquipmentType[];
}

export default function EquipmentTypeTable({ data }: EquipmentTypeTableProps) {
    return (
        <>
            <div className='flex mb-2'>
                <Header className='mb-0 grow'>Equipment Types</Header>
                <CreateEquipmentTypeDialog />
            </div>
            <DataTable columns={equipmentTypeColumns} data={data} />
        </>
    );
}