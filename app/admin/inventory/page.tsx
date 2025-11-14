import generateSSRClient from '@/app/utils/generate-ssr-client';
import EquipmentTypeTable from './tables/equipment-type-table';
import { equipmentTypeSelectionSet } from './tables/equipment-type-config';
import Container from '@/components/primitives/container';
import Title from '@/components/primitives/text/title';
import { equipmentSelectionSet } from './tables/equipment-config';
import EquipmentTable from './tables/equipment-table';
import { AMPLIFY_DATA_LIST_LIMIT } from '@/app/utils/constants';

export default async function AdminInventoryPage() {
	const client = generateSSRClient();

	const [equipmentTypes, equipment] = await Promise.all([
		client.models.EquipmentType.list({
			selectionSet: equipmentTypeSelectionSet,
			limit: AMPLIFY_DATA_LIST_LIMIT
		}),
		client.models.Equipment.list({
			selectionSet: equipmentSelectionSet,
			limit: AMPLIFY_DATA_LIST_LIMIT
		})
	]);

	if (equipmentTypes.errors) {
		throw new Error(JSON.stringify(equipmentTypes.errors));
	}
	if (equipment.errors) {
		throw new Error(JSON.stringify(equipment.errors));
	}

	return (
		<Container>
			<Title>Inventory</Title>
			<div className='flex flex-col gap-8'>
				<EquipmentTypeTable data={equipmentTypes.data} />
				<EquipmentTable data={equipment.data} />
			</div>
		</Container>
	)
}