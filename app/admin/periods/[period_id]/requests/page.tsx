interface AdminPeriodRequestsPageProps {
  params: {
    period_id: string;
  };
}

export default function AdminPeriodRequestsPage({ params }: AdminPeriodRequestsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Periods {params.period_id} Requests</h1>
      <p className="text-gray-600 mb-4">
        Viewing requests for period ID: <span className="font-mono">{params.period_id}</span>
      </p>
      <p className="text-gray-600">
        This page will display all equipment loan requests for a specific period.
      </p>
    </div>
  );
}