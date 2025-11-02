import { generateClient as generateAmplifyClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';

export default function generateClient() {
    return generateAmplifyClient<Schema>();
}