import { Entry } from '../../interfaces';
import { EntriesState } from './EntriesProvider';

type entries =
	| { type: '[Entry] Add-Entry'; payload: Entry }
	| { type: '[Entry] Update-Entry'; payload: Entry }
	| { type: '[Entry] Refresh-entries'; payload: Entry[] }
	| { type: '[Entry] Delete-Entry' };

export const entriesReducer = (state: EntriesState, action: entries): EntriesState => {
	switch (action.type) {
		case '[Entry] Add-Entry':
			return {
				...state,
				entries: [...state.entries, action.payload],
			};

		case '[Entry] Update-Entry':
			return {
				...state,
				entries: state.entries.map(entry => {
					if (entry._id === action.payload._id) {
						entry.status = action.payload.status;
						entry.description = action.payload.description;
					}
					return entry;
				}),
			};

		case '[Entry] Refresh-entries':
			return {
				...state,
				entries: [...action.payload],
			};

		case '[Entry] Delete-Entry':
			return {
				...state,
			};

		default:
			return state;
	}
};
