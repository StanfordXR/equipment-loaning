import { AppSyncIdentityCognito } from 'aws-lambda';
import { Schema } from '../../data/resource';
import {
    CognitoIdentityProviderClient,
    ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider';

type ReturnType = { username: string; displayName: string }[];
const DEFAULT_DISPLAY_NAME = 'USER NOT FOUND';
const EMPTY_DISPLAY_NAME = 'UNNAMED USER';

const client = new CognitoIdentityProviderClient();

export const handler: Schema['getUserDisplayNames']['functionHandler'] = async (event, context) => {
    const issuerURL = (event.identity as AppSyncIdentityCognito)['issuer'];
    const issuerURLComponents = issuerURL.split('/');
    const userPoolId = issuerURLComponents[issuerURLComponents.length - 1];

    let remainingUsernames: string[] = event.arguments.usernames ?? [];
    let results: ReturnType = [];
    let paginationToken: string | undefined = undefined;

    while (remainingUsernames.length > 0) {
        const command: ListUsersCommand = new ListUsersCommand({
            UserPoolId: userPoolId,
            PaginationToken: paginationToken
        });
        const response = await client.send(command);

        if (!response.Users) {
            throw new Error('Expected list of users, but got undefined');
        }

        // Add to found display names `results`
        response.Users.map((user) => {
            if (!user.Username || !remainingUsernames.includes(user.Username)) {
                return;
            }

            const givenNameAttr = user.Attributes?.find((a: any) => a.Name == 'given_name')?.Value ?? '';
            const familyNameAttr = user.Attributes?.find((a: any) => a.Name == 'family_name')?.Value ?? '';

            const displayName = [givenNameAttr, familyNameAttr].join(' ').trim();
            results.push({
                username: user.Username,
                displayName: displayName == '' ? EMPTY_DISPLAY_NAME : displayName
            });
        });

        // Filter `remainingUsers`
        const usernames = response.Users.map(u => u.Username);
        remainingUsernames = remainingUsernames.filter(u => !usernames.includes(u));

        // Update pagination
        if (response.PaginationToken) {
            paginationToken = response.PaginationToken as string;
        } else {
            // No more pages
            break;
        }
    }

    // For any usernames not found, include them with default displayName
    remainingUsernames.map((username) => {
        results.push({ username, displayName: DEFAULT_DISPLAY_NAME });
    });

    return results;
};