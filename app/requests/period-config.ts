import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const periodSelectionSet = [
    'id',
    'name',
    'periodType',
    'startDateTime',
    'endDateTime',

    'loanableEquipment.equipment.id',
    'loanableEquipment.equipment.equipmentType.id',
    'loanableEquipment.equipment.equipmentType.name'
] as const;


export type Period = SelectionSet<Schema['Period']['type'], typeof periodSelectionSet>;