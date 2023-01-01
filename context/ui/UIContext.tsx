import { createContext } from 'react';

export interface ContextProps {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;
	isDragging: boolean;

	actionMenu: () => void;
	setIsAddingEntry: (isAddingEntry: boolean) => void;
	startDragging: () => void;
	endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
