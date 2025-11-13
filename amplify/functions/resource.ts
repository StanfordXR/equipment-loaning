import { defineFunction } from '@aws-amplify/backend';

export const getUserDisplayNames = defineFunction({
    name: 'get-user-display-names',
    entry: './get-user-display-names/handler.ts'
})