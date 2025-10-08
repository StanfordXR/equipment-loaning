'use client';

import { useSearchParams } from 'next/navigation';

export default function NewRequestPage() {
  const searchParams = useSearchParams();
  const periodId = searchParams.get('period');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">New Request</h1>
      {periodId && (
        <p className="text-gray-600 mb-4">
          Creating request for period: <span className="font-mono">{periodId}</span>
        </p>
      )}
      <p className="text-gray-600">
        This page will contain a form to create a new equipment loan request.
      </p>
    </div>
  );
}