import generateSSRClient from '@/app/utils/generate-ssr-client';
import EquipmentTypeTable from './tables/equipment-type-table';
import { selectionSet } from './tables/equipment-type-config';

export default async function AdminInventoryPage() {
  const client = generateSSRClient();

  const equipmentTypes = await client.models.EquipmentType.list({
    selectionSet: selectionSet
  });
  if (equipmentTypes.errors) {
    throw new Error(JSON.stringify(equipmentTypes.errors));
  }

  return (
    <div className='w-full'>
      <div className='mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Admin Inventory</h1>
        <EquipmentTypeTable data={equipmentTypes.data} />
      </div>
    </div>
  )
}