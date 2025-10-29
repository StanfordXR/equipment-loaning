'use server'

import generateSSRClient from '@/app/utils/generate-ssr-client'

export default async function periodAutoMatch() {
    const client = generateSSRClient();
    console.log(await client.models.Period.list());
}