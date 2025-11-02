import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import outputs from "@/amplify_outputs.json";
import { type Schema } from '@/amplify/data/resource'
import { cookies } from 'next/headers';

export default function generateSSRClient() {
    return generateServerClientUsingCookies<Schema>({
        config: outputs,
        cookies
    });
}