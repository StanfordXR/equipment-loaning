import { Schema } from '@/amplify/data/resource';
import { SelectionSet } from 'aws-amplify/api';

export const periodSelectionSet = ['id', 'name', 'periodType', 'startDateTime', 'endDateTime', 'acceptingRequests'] as const;
export type Period = SelectionSet<Schema['Period']['type'], typeof periodSelectionSet>;