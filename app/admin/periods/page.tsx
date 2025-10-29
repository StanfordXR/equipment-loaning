'use client'

import periodAutoMatch from '@/app/actions/period-auto-match';
import { Button } from '@/components/ui/button';

export default function AdminPeriodsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Periods</h1>
      <p className="text-gray-600">
        This page will display all loan periods for administrative management.
      </p>

      <Button onClick={async () => await periodAutoMatch()}>Match</Button>
    </div>
  );
}