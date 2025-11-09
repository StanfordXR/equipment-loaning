import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const requestsSelectionSet = [
    'id',
    'status',
    'owner',
    'createdAt',
    'period.name',
    'assignment.id',
] as const;


export type Request = SelectionSet<Schema['Request']['type'], typeof requestsSelectionSet>;