'use client'

import { PeriodType } from '@/amplify/data/constants';
import generateClient from '@/app/utils/generate-client';
import Container from '@/components/primitives/container';
import CheckboxWithDescription from '@/components/primitives/interactions/checkbox-with-description';
import { DataSelect } from '@/components/primitives/interactions/data-select';
import { TextInputWithLabel } from '@/components/primitives/interactions/text-input-with-label';
import Title from '@/components/primitives/text/title';
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker';
import InputLabel from '@/components/primitives/interactions/input-label';
import Subtext from '@/components/primitives/text/subtext';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import handleError from '@/app/utils/handle-error';
import LoanableEquipmentChecklist from '../components/loanable-equipment-checklist';
import { Label } from '@/components/ui/label';

export default function NewPeriodPage() {
  const client = generateClient();

  const [name, setName] = useState('');
  const [periodType, setPeriodType] = useState<PeriodType>();
  const [acceptingRequests, setAcceptingRequests] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [loanableEquipment, setLoanableEquipment] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const canSubmit = (
    name != '' &&
    periodType != undefined &&
    dateRange != undefined &&
    dateRange.from != undefined &&
    dateRange.to != undefined
  )

  const createPeriod = async () => {
    setIsLoading(true);

    const period = await client.models.Period.create({
      name: name,
      periodType: periodType,
      acceptingRequests: acceptingRequests,
      startDateTime: dateRange?.from?.toISOString() as string,
      endDateTime: dateRange?.to?.toISOString() as string
    });

    if (period.errors) {
      handleError(period.errors);
      setIsLoading(false);
      return;
    }

    const periodId = period.data?.id;
    if (!periodId) {
      handleError('Expected nonnull created period ID, but got null');
      return;
    }

    const loanableEquipmentResults = await Promise.all(loanableEquipment?.map(equipmentId => {
      return client.models.PeriodEquipment.create({
        equipmentId,
        periodId
      });
    }));

    loanableEquipmentResults.map(({ errors }) => {
      if (errors) {
        // Display the error, but don't prevent redirect
        handleError(errors);
      }
    });
    router.push(`/admin/periods/${periodId}`);

  }

  return (
    <Container width='tight'>
      <Title>New Period</Title>
      <div className='flex flex-col gap-6'>
        <TextInputWithLabel
          inputID='new-period-name'
          label='Period Name'
          onChange={setName}
          value={name}
          isRequired={true}
          placeholder='e.g. Immerse the Bay 2025'
        />

        <DataSelect
          inputID='new-period-type'
          label='Period Type'
          className='mb-1'
          queryData={async () => {
            return [
              { value: PeriodType.MATCH, label: 'Hackathon Loaning' },
              { value: PeriodType.APPROVAL, label: 'General Loaning' },
            ]
          }}
          value={periodType ?? ''}
          onChange={(val) => {
            setPeriodType(val as PeriodType)
          }} />

        <InputLabel
          label='Period Dates'
          isRequired={true}
        >
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <Calendar
              mode='range'
              required={true}

              selected={dateRange}
              onSelect={setDateRange}
              className="rounded-lg border mt-1"
            />
            <div>
              {
                dateRange?.from && dateRange?.to &&
                <Subtext className='flex flex-col gap-2'>
                  <div>
                    Start Date: {dayjs(dateRange.from).format('M/D/YY [at] h:mm A')}
                  </div>
                  <div>
                    End Date: {dayjs(dateRange.to).format('M/D/YY [at] h:mm A')}
                  </div>
                </Subtext>
              }
            </div>
          </div>
        </InputLabel>

        <InputLabel
          label='Request Status'
          inputID='new-period-accepting-requests'
          isRequired={false}
        >
          <CheckboxWithDescription
            inputID='new-period-accepting-requests'
            label='Accept new user requests upon creation'
            description={`
            Recommended to be true
          `}
            value={acceptingRequests}
            onChange={(val) => {
              if (val == 'indeterminate') {
                handleError('Error: expected boolean for acceptingRequests checkbox, but got indeterminate');
                return;
              }
              setAcceptingRequests(val);
            }}
            className='mt-1'
          />
        </InputLabel>

        <div>
          <div className='mb-3'>
            <Label className='mb-1'>Loanable Equipment</Label>
            <Subtext>
              Equipment that can be loaned out within this period. Note that multiple periods can simultaoneously list
              a given piece of equipment as loanable.
            </Subtext>
          </div>
          <LoanableEquipmentChecklist
            onChange={setLoanableEquipment}
          />
        </div>

        <Button
          disabled={!canSubmit || isLoading}
          onClick={createPeriod}
        >
          {isLoading ? 'Loading...' : 'Create Period'}
        </Button>
      </div>
    </Container >
  );
}