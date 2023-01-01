import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
	entry: Entry;
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
	const { endDragging, startDragging } = useContext(UIContext);
	const router = useRouter();

	const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		event.dataTransfer.setData('entry', entry._id);

		startDragging();
	};

	const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
		endDragging();
		event.dataTransfer.clearData();
	};

	const onClick = () => {
		router.push(`/entries/${entry._id}`);
	};

	return (
		<Card
			sx={{ marginBottom: 1, cursor: 'pointer' }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onClick={onClick}
		>
			<CardContent>
				<Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
				<CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
					<Typography sx={{ whiteSpace: 'pre-line' }}>{dateFunctions.formatDate(entry.createdAt)}</Typography>
				</CardActions>
			</CardContent>
		</Card>
	);
};
