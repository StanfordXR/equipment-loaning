import { type Schema } from '@/amplify/data/resource';
import { ColumnDef } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react';
import { SelectionSet } from 'aws-amplify/api';

const nameColumn: ColumnDef<EquipmentType> = {
    accessorKey: 'name',
    header: 'Equipment Type',
    cell: ({ row }) => <div className='lowercase'>{row.getValue('name')}</div>,
};

const actionsColumn: ColumnDef<EquipmentType> = {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className='fit-content'>
                    <MoreHorizontal className='h-4 w-4' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(row.original.id)}
                    >
                        Copy ID
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
};

export const equipmentTypeColumns: ColumnDef<EquipmentType>[] = [
    nameColumn,
    actionsColumn
];

export const selectionSet = ['id', 'name'] as const;
export type EquipmentType = SelectionSet<Schema['EquipmentType']['type'], typeof selectionSet>;