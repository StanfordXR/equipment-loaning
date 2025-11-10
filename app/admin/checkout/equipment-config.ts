import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const equipmentSelectionSet = [
    'id',
    'accessories',
    'notes',
    'equipmentType.name',
    
    'assignment.id',
    'assignment.status',
    'assignment.collateralDescription',
    'assignment.period.name'
] as const;
export type Equipment = SelectionSet<Schema['Equipment']['type'], typeof equipmentSelectionSet>;