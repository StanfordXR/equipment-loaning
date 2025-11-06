import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const periodWithDetailsSelectionSet = [
    'id',
    'name',
    'periodType',
    'startDateTime',
    'endDateTime',
    'acceptingRequests',

    'loanableEquipment.equipment.id',
    'loanableEquipment.equipment.assignment.id',
    'loanableEquipment.equipment.equipmentType.name',
] as const;
export type PeriodWithDetails = SelectionSet<Schema['Period']['type'], typeof periodWithDetailsSelectionSet>;