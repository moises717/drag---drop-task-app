import { createContext } from 'react';
import { Entry } from '../../interfaces';

export interface ContextProps {
	entries: Entry[];
	addNewEntry: (description: string) => void;
	updateEntry: (entry: Entry, showMessage?: boolean) => void;
	deleteEntry: (id: string) => void;
	refreshEntries: () => void;
}

export const EntriesContext = createContext({} as ContextProps);
