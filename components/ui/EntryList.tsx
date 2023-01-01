import React, { useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
	status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, endDragging } = useContext(UIContext);

	const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

	const onDropEntry = (event: React.DragEvent<HTMLDivElement>) => {
		const entryId = event.dataTransfer.getData('entry');

		const entry = entries.find(entry => entry._id === entryId)!;

		updateEntry({ ...entry, status });
		endDragging();
	};

	const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
			<Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'scroll', backgroundColor: 'transparent', padding: 1 }}>
				<List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
					{entriesByStatus.map(entry => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
