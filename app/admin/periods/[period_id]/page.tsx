import { PeriodType } from '@/amplify/data/constants';
import generateSSRClient from '@/app/utils/generate-ssr-client';
import Container from '@/components/primitives/container';
import Header from '@/components/primitives/text/header';
import Title from '@/components/primitives/text/title';
import dayjs from 'dayjs';
import Subtext from '@/components/primitives/text/subtext';
import { PeriodWithDetails, periodWithDetailsSelectionSet } from './period-details.config';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon, CircleCheckIcon } from 'lucide-react';

interface AdminPeriodPageProps {
  params: {
    period_id: string;
  };
}

export default async function AdminPeriodPage({ params }: AdminPeriodPageProps) {
  const client = generateSSRClient();
  const period = await client.models.Period.get({
    id: params.period_id
  }, {
    selectionSet: periodWithDetailsSelectionSet
  });

  if (period.errors) {
    throw new Error(JSON.stringify(period.errors));
  }

  if (!period.data) {
    return (
      <div className='flex items-center justify-center w-full h-full text-muted-foreground'>
        <div className='text-center'>
          <div>Period not found.</div>
          <div>Period id: <span className='font-mono'>{params.period_id}</span></div>
        </div>
      </div>
    );
  }


  return (
    <Container>
      <Title>{period.data.name}</Title>
      <div className='flex flex-col gap-8'>
        <PeriodOverview period={period.data} />
        <PeriodLoanableEquipment period={period.data} />
      </div>
    </Container>
  );
}

function PeriodOverview({ period }: { period: PeriodWithDetails }) {
  const startDateTime = dayjs(period.startDateTime).format('M/D/YY [at] h:m A');
  const endDateTime = dayjs(period.endDateTime).format('M/D/YY [at] h:m A');

  return (
    <div>
      <Header>Overview</Header>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 md:gap-y-6'>
        <PeriodAttribute label='Period Type' value={
          period.periodType == PeriodType.MATCH ? 'Hackathon Loaning' : 'General Loaning'
        } />
        <PeriodAttribute label='Start Date' value={startDateTime} />
        <PeriodAttribute label='End Date' value={endDateTime} />
        <PeriodAttribute label='New Requests' value={
          period.acceptingRequests ? 'Accepting new requests' : 'Not accepting new requests'
        } />
      </div>
    </div>
  );
}

function PeriodLoanableEquipment({ period }: { period: PeriodWithDetails }) {
  const equipment = period.loanableEquipment.map((l) => l.equipment);
  const nonAssignedEquipmentCount = equipment.filter((e) => !e.assignment).length;

  return (
    <div>
      <div className='mb-2'>
        <Header className='mb-1'>Loanable Equipment</Header>
        <Subtext>Equipment that can be checked out in this period.</Subtext>
      </div>

      <Alert className='mb-1 w-fit'>
        {nonAssignedEquipmentCount == 0 ?
          <>
            <AlertCircleIcon />
            <AlertTitle>
              All loanable equipment is assigned.
            </AlertTitle>
          </>
          :
          <>
            <CircleCheckIcon />
            <AlertTitle>
              {nonAssignedEquipmentCount} of {equipment.length} equipments available to loan
            </AlertTitle>
          </>
        }
      </Alert>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipment Type</TableHead>
            <TableHead>Equipment ID</TableHead>
            <TableHead>Checkout Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((e) => {
            return (
              <TableRow key={e.id}>
                <TableCell>{e.equipmentType.name}</TableCell>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.assignment ?
                  <div className='flex items-center gap-1'>Checked Out</div>
                  :
                  <div className='flex items-center gap-1'>Available</div>
                }</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {equipment.length == 0 &&
        <div className='text-muted-foreground py-4 text-center text-sm'>No loanable equipment</div>
      }
    </div>
  )
}

function PeriodAttribute({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className='text-muted-foreground text-sm font-semibold'>{label}</div>
      <div>{value}</div>
    </div>
  )
}