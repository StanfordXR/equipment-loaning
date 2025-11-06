import generateSSRClient from '@/app/utils/generate-ssr-client';
import Container from '@/components/primitives/container';
import Header from '@/components/primitives/text/header';
import Title from '@/components/primitives/text/title';
import { Period, periodSelectionSet } from './period-config';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import dayjs from 'dayjs';
import { PeriodType } from '@/amplify/data/constants';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, CircleX } from 'lucide-react';
import Link from 'next/link';
import Subtext from '@/components/primitives/text/subtext';
import { Children } from '@/components/types';
import { Button } from '@/components/ui/button';

export default async function AdminPeriodsPage() {
  const client = generateSSRClient();
  const periods = await client.models.Period.list({
    selectionSet: periodSelectionSet
  });

  if (periods.errors) {
    throw new Error(JSON.stringify(periods.errors));
  }

  const activePeriods = periods.data.filter((period) => dayjs(period.endDateTime).isAfter(dayjs()));
  const inactivePeriods = periods.data.filter((period) => dayjs(period.endDateTime).isBefore(dayjs()));

  return (
    <Container>
      <Title>Periods</Title>
      <div className='flex flex-col gap-8'>
        <div>
          <div className='mb-2'>
            <div className='flex items-center'>
              <Header className='mb-0 grow'>Active Periods</Header>
              <Button asChild>
                <Link href='/admin/periods/new'>
                  Create Period
                </Link>
              </Button>
            </div>
            <Subtext>Periods where the end date has not yet passed.</Subtext>
          </div>

          {activePeriods.length > 0 ?
            <PeriodGrid>
              {activePeriods.map((period) => <PeriodItem period={period} key={period.id} />)}
            </PeriodGrid>
            :
            <div className='text-center text-muted-foreground py-3'>
              No active periods
            </div>
          }

        </div>
        <div>
          <div className='mb-2'>
            <Header className='mb-0'>Inactive Periods</Header>
            <Subtext>Period where the end date has already passed.</Subtext>
          </div>
          {inactivePeriods.length > 0 ?
            <PeriodGrid>
              {inactivePeriods.map((period) => <PeriodItem period={period} key={period.id} />)}
            </PeriodGrid>
            :
            <div className='text-center text-muted-foreground py-3'>
              No inactive periods
            </div>
          }
        </div>
      </div>
    </Container >
  );
}

function PeriodGrid({ children }: Children) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {children}
    </div>
  );
}

function PeriodItem({ period }: { period: Period }) {
  const startDate = dayjs(period.startDateTime).format('M/D/YY');
  const endDate = dayjs(period.endDateTime).format('M/D/YY');

  return (
    <Item variant='outline' asChild>
      <Link href={`/admin/periods/${period.id}`}>
        <ItemContent>
          <ItemTitle>{period.name}</ItemTitle>
          <ItemDescription>
            {startDate} to {endDate}
          </ItemDescription>
          <div className='flex flex-col gap-1'>
            {period.acceptingRequests ?
              <Badge variant='secondary'><CircleCheck />Accepting new requests</Badge>
              :
              <Badge variant='secondary'><CircleX />Not accepting new requests</Badge>
            }
            {period.periodType == PeriodType.MATCH ?
              <Badge variant='secondary'>Hackathon Loaning</Badge>
              :
              <Badge variant='secondary'>General Loaning</Badge>
            }
          </div>
        </ItemContent>
        <ItemActions />
      </Link>
    </Item>
  );
}