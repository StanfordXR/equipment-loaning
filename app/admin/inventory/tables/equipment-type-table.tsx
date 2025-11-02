'use client'

import DataTable from '@/components/data-table/data-table'
import { type EquipmentType, equipmentTypeColumns } from './equipment-type-config'

interface EquipmentTypeTableProps {
    data: EquipmentType[];
}

export default function EquipmentTypeTable({ data }: EquipmentTypeTableProps) {
    return (
        <DataTable columns={equipmentTypeColumns} data={data} className='max-w-[800px] mx-auto' />
    );
}