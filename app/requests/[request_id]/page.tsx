interface RequestPageProps {
  params: {
    request_id: string;
  };
}

export default function RequestPage({ params }: RequestPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request Details</h1>
      <p className="text-gray-600 mb-4">
        Viewing request ID: <span className="font-mono">{params.request_id}</span>
      </p>
      <p className="text-gray-600">
        This page will display details for a specific equipment loan request.
      </p>
    </div>
  );
}