"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { Button } from '@/components/ui/button';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setName((await fetchUserAttributes())?.given_name ?? '');
      } catch (err: any) {
        // Ignore UserUnAuthenticatedException
        if (err?.name !== 'UserUnAuthenticatedException') {
          throw err;
        }
      }

      // console.log(await client.models.Period.list());
    };
    loadUser();
  }, []);

  return (
    <div className='p-16'>
      <h1 className='text-2xl mb-2'>{name ? `Hello, ${name}` : 'Hello world'}</h1>
      {name ?
        <Button onClick={async () => 
          await signOut()
        }>Sign out</Button>
        :
        <Button onClick={async () =>
          await signInWithRedirect({
            provider: 'Google'
          })
        }>Sign in</Button>
      }
    </div>
  );
}
