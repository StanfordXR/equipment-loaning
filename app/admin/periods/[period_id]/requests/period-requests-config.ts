import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const periodRequestsSelectionSet = [
    'name',
    'periodType',

    'loanableEquipment.equipment.id',
    'loanableEquipment.equipment.equipmentTypeId',
    'loanableEquipment.equipment.equipmentType.name',
    'loanableEquipment.equipment.assignment.id',

    'requests.id',
    'requests.status',
    'requests.owner',
    'requests.assignment.equipmentType.name',
    'requests.assignment.id',

    'requests.equipmentTypeRequests.equipmentType.id',
    'requests.equipmentTypeRequests.equipmentType.name',
] as const;
export type PeriodRequests = SelectionSet<Schema['Period']['type'], typeof periodRequestsSelectionSet>;