'use client'

import DataTable from '@/components/data-table/data-table'
import { type EquipmentType, equipmentTypeColumns } from './equipment-type-config'
import Header from '@/components/primitives/text/header';

interface EquipmentTypeTableProps {
    data: EquipmentType[];
}

export default function EquipmentTypeTable({ data }: EquipmentTypeTableProps) {
    return (
        <>
            <Header>Equipment Types</Header>
            <DataTable columns={equipmentTypeColumns} data={data} />
        </>
    );
}