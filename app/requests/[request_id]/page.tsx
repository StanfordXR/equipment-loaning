import generateSSRClient from '@/app/utils/generate-ssr-client';
import Container from '@/components/primitives/container';
import Title from '@/components/primitives/text/title';
import { requestWithDetailsSelectionSet } from './request-details-config';
import RequestAttributes from './components/request-attributes';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface RequestPageProps {
	params: {
		request_id: string;
	};
}

export default async function RequestPage({ params }: RequestPageProps) {
	const client = generateSSRClient();

	const { data: request, errors } = await client.models.Request.get({ id: params.request_id }, {
		selectionSet: requestWithDetailsSelectionSet
	});

	if (errors) {
		throw new Error(JSON.stringify(errors));
	}

	if (!request) {
		return (
			<div className='flex items-center justify-center w-full h-full text-muted-foreground'>
				<div className='text-center'>
					<div>Request not found.</div>
					<div>Request id: <span className='font-mono'>{params.request_id}</span></div>
				</div>
			</div>
		);
	}

	return (
		<Container width='tight'>
			<Link href='/requests' className='text-sm text-muted-foreground py-1 mb-0.5 w-fit flex items-center gap-0.5'>
				<ChevronLeft size={16} />
				Back
			</Link>
			<Title>Request for {request.period.name}</Title>
			<RequestAttributes request={request} />
		</Container>
	);
}