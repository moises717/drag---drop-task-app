import { FC, ReactElement, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { EntriesContext } from '.';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { entriesReducer } from './entriesReducer';

export interface EntriesState {
	entries: Entry[];
}
interface EntriesProviderProps {
	children: ReactElement | ReactElement[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }: EntriesProviderProps) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
	const { enqueueSnackbar } = useSnackbar();

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>('/entries', {
			description,
			status: 'pending',
		});

		dispatch({
			type: '[Entry] Add-Entry',
			payload: data,
		});
	};

	const updateEntry = async ({ description, status, _id }: Entry, showMessage = false) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description,
				status,
			});

			dispatch({
				type: '[Entry] Update-Entry',
				payload: data,
			});

			showMessage && enqueueSnackbar('Entry updated successfully', { variant: 'success' });
		} catch (error) {
			console.log(error);
		}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');

		dispatch({
			type: '[Entry] Refresh-entries',
			payload: data,
		});
	};

	const deleteEntry = async (id: string) => {
		await entriesApi.delete(`/entries/${id}`);

		dispatch({
			type: '[Entry] Delete-Entry',
		});
	};

	useEffect(() => {
		refreshEntries();
	}, []);

	return (
		<EntriesContext.Provider
			value={{
				...state,
				addNewEntry,
				updateEntry,
				deleteEntry,
				refreshEntries,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
