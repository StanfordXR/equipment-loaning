import generateSSRClient from '@/app/utils/generate-ssr-client';
import PeriodNotFound from '../components/period-not-found';
import { periodRequestsSelectionSet } from './period-requests-config';
import { PeriodType } from '@/amplify/data/constants';
import Requests from './requests';

interface AdminPeriodRequestsPageProps {
	params: {
		period_id: string;
	};
}

export default async function AdminPeriodRequestsPage({ params }: AdminPeriodRequestsPageProps) {
	const client = generateSSRClient();

	const period = await client.models.Period.get({
		id: params.period_id
	}, {
		selectionSet: periodRequestsSelectionSet
	});

	if (period.errors) {
		throw new Error(JSON.stringify(period.errors));
	}

	if (!period.data) {
		return <PeriodNotFound periodID={params.period_id} />;
	}

	if (period.data.periodType == PeriodType.APPROVAL) {
		return (
			<div className='flex items-center justify-center w-full h-full text-muted-foreground'>
				<div className='text-center'>
					<div>Periods of type <span className='font-mono'>APPROVAL</span> (general loaning) are not yet supported.</div>
				</div>
			</div>
		)
	};

	return <Requests period={period.data} />;
}