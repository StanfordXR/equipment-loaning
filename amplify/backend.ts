import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { getUserDisplayNames } from './functions/resource.js';

defineBackend({
  auth,
  data,
  getUsernames: getUserDisplayNames
});
