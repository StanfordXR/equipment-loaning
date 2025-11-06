'use client'

import generateAutoMatch from '@/app/actions/generate-auto-match';
import Container from '@/components/primitives/container';
import { Button } from '@/components/ui/button';

export default function AdminPeriodsPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Admin Periods</h1>
      <p className="text-gray-600">
        This page will display all loan periods for administrative management.
      </p>

      <Button onClick={async () => console.log(await generateAutoMatch({ periodID: 'de821de9-f104-490e-bba9-d14062896b22' }))}>Match</Button>
    </Container>
  );
}