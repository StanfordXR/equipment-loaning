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

const idColumn: ColumnDef<Equipment> = {
    accessorKey: 'id',
    header: 'Equipment ID',
    cell: ({ row }) => row.getValue('id'),
};

const equipmentTypeColumn: ColumnDef<Equipment> = {
    accessorKey: 'Equipment Type',
    header: 'Equipment Type',
    cell: ({ row }) => row.original.equipmentType.name,
};

const notesColumn: ColumnDef<Equipment> = {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
        return row.getValue('notes')
    }
};

const accessoriesColumn: ColumnDef<Equipment> = {
    accessorKey: 'accessories',
    header: 'Accessories',
    cell: ({ row }) => {
        return row.original.accessories?.join(',');
    }
};

const actionsColumn: ColumnDef<Equipment> = {
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

export const equipmentColumns: ColumnDef<Equipment>[] = [
    equipmentTypeColumn,
    idColumn,
    notesColumn,
    accessoriesColumn,
    actionsColumn
];

export const equipmentSelectionSet = ['id', 'accessories', 'notes', 'equipmentType.name'] as const;
export type Equipment = SelectionSet<Schema['Equipment']['type'], typeof equipmentSelectionSet>;