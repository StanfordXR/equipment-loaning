import { defineAuth, secret } from "@aws-amplify/backend";
import { ADMIN_GROUP } from './constants';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders : {
      google: {
        clientId: secret('AUTH_GOOGLE_CLIENT_ID'),
        clientSecret: secret('AUTH_GOOGLE_CLIENT_SECRET'),
        attributeMapping: {
          email: 'email',
          givenName: 'given_name',
          familyName: 'family_name'
        },
        scopes: [
          'email',
          'profile',
        ]
      },
      scopes: [
        'EMAIL',
        'PROFILE',
        'COGNITO_ADMIN'  // used to call `fetchUserAttributes()`
      ],
      callbackUrls: [
        'http://localhost:3000',
        'https://equipment.stanfordxr.org'
      ],
      logoutUrls: [
        'http://localhost:3000',
        'https://equipment.stanfordxr.org'
      ],
    }
  },

  groups: [ADMIN_GROUP]
});
