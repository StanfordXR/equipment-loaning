'use client'

import DataTable from '@/components/data-table/data-table'
import { type Equipment, equipmentColumns } from './equipment-config'
import Header from '@/components/primitives/text/header';
import CreateEquipmentDialog from '../dialogs/create-equipment-dialog';

interface EquipmentTableProps {
    data: Equipment[];
}

export default function EquipmentTable({ data }: EquipmentTableProps) {
    return (
        <div>
            <div className='flex mb-2'>
                <Header className='mb-0 grow'>Equipment</Header>
                <CreateEquipmentDialog />
            </div>
            <DataTable columns={equipmentColumns} data={data} />
        </div>
    );
}