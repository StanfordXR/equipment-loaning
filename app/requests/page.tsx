import Container from '@/components/primitives/container';
import Title from '@/components/primitives/text/title';
import CurrentRequests from './components/current-requests';
import NewRequest from './components/new-request';
import generateSSRClient from '../utils/generate-ssr-client';
import { periodSelectionSet } from './period-config';
import { AMPLIFY_DATA_LIST_LIMIT } from '../utils/constants';

export default async function RequestsPage() {
  const client = generateSSRClient();

  const periods = await client.models.Period.list({
    selectionSet: periodSelectionSet,
    limit: AMPLIFY_DATA_LIST_LIMIT,
    filter: {
      and: [
        { acceptingRequests: { eq: true } },
        { endDateTime: { gt: (new Date()).toISOString() } }
      ]
    }
  });

  if (periods.errors) {
    throw new Error(JSON.stringify(periods.errors));
  }

  return (
    <Container>
      <Title>StanfordXR Equipment Requests</Title>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3 lg:col-span-2'>
          <CurrentRequests />
        </div>
        <div className='col-span-3 lg:col-span-1'>
          <NewRequest periods={periods.data} />
        </div>
      </div>
    </Container>
  );
}