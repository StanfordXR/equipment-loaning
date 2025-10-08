interface AdminPeriodPageProps {
  params: {
    period_id: string;
  };
}

export default function AdminPeriodPage({ params }: AdminPeriodPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Periods {params.period_id}</h1>
      <p className="text-gray-600 mb-4">
        Managing period ID: <span className="font-mono">{params.period_id}</span>
      </p>
      <p className="text-gray-600">
        This page will display administrative details for a specific loan period.
      </p>
    </div>
  );
}