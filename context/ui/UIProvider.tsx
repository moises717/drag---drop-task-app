import { FC, ReactElement, useReducer } from 'react';
import { uiReducer, UIContext } from './';

export interface UIState {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;
	isDragging: boolean;
}
interface UIProviderProps {
	children: ReactElement | ReactElement[];
}

const UI_INITIAL_STATE: UIState = {
	sideMenuOpen: false,
	isAddingEntry: false,
	isDragging: false,
};

export const UIProvider: FC<UIProviderProps> = ({ children }: UIProviderProps) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const actionMenu = () => {
		dispatch({ type: `${!state.sideMenuOpen ? 'UI - Open Sidebar' : 'UI - Close Sidebar'}` });
	};

	const setIsAddingEntry = (isAddingEntry: boolean) => {
		dispatch({ type: 'UI - Set isAddingEntry', payload: isAddingEntry });
	};

	const startDragging = () => {
		dispatch({ type: 'UI - Start Dragging' });
	};
	const endDragging = () => {
		dispatch({ type: 'UI - End Dragging' });
	};

	return (
		<UIContext.Provider
			value={{
				...state,
				actionMenu,
				setIsAddingEntry,
				startDragging,
				endDragging,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
