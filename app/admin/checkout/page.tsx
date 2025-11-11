'use client'

import Container from '@/components/primitives/container'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import EquipmentLookup from './components/equipment-lookup';
import { Equipment } from './equipment-config';
import EquipmentView from './components/equipment-view';

export default function AdminCheckoutPage() {
  const [equipment, setEquipment] = useState<Equipment>();

  return (
    <Container className='h-full'>
      <div className='flex items-center justify-center h-full'>
        <Card className='w-full max-w-lg gap-4'>
          <CardHeader>
            <CardTitle>
              {equipment ?
                `${!equipment.assignment.status ? 'Checkout' : 'Return'} ${equipment.id}`
                :
                'Equipment checkout and return'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {
              equipment ?
                <EquipmentView
                  equipment={equipment}
                  onReset={() => {
                    setEquipment(undefined)
                  }}
                />
                :
                <EquipmentLookup setEquipment={setEquipment} />
            }
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}