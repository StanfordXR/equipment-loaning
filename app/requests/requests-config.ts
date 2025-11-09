import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const requestsSelectionSet = [
    'id',
    'status',
    'owner',
    'createdAt',
    'period.name',
    
    'equipmentTypeRequests.equipmentType.id',
    'equipmentTypeRequests.equipmentType.name',
    
    'assignment.id',
    'assignment.equipmentType.id',
    'assignment.equipmentType.name',
] as const;


export type Request = SelectionSet<Schema['Request']['type'], typeof requestsSelectionSet>;