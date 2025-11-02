import generateSSRClient from '@/app/utils/generate-ssr-client';
import EquipmentTypeTable from './tables/equipment-type-table';
import { selectionSet } from './tables/equipment-type-config';
import Container from '@/components/primitives/container';
import Title from '@/components/primitives/text/title';

export default async function AdminInventoryPage() {
	const client = generateSSRClient();

	const equipmentTypes = await client.models.EquipmentType.list({
		selectionSet: selectionSet
	});
	if (equipmentTypes.errors) {
		throw new Error(JSON.stringify(equipmentTypes.errors));
	}

	return (
		<Container className='pt-20'>
			<Title>Inventory</Title>
			<EquipmentTypeTable data={equipmentTypes.data} />
		</Container>
	)
}