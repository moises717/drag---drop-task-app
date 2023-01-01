import { useState, ChangeEvent, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlineIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);

	const { addNewEntry } = useContext(EntriesContext);
	const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

	const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onSave = () => {
		if (inputValue.length <= 0) {
			setTouched(true);
			return;
		}
		addNewEntry(inputValue);
		setIsAddingEntry(false);
		setTouched(false);
		setInputValue('');
	};

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder='Nueva Entrada'
						autoFocus
						multiline
						label='Ingrese una entrada'
						error={inputValue.length <= 0 && touched}
						value={inputValue}
						onChange={onChangeField}
						onBlur={() => setTouched(true)}
					/>
					<Box display='flex' justifyContent='space-between'>
						<Button
							variant='text'
							endIcon={<SaveOutlineIcon />}
							color='warning'
							onClick={() => setIsAddingEntry(false)}
						>
							Cancelar
						</Button>
						<Button variant='outlined' color='secondary' endIcon={<SaveOutlineIcon />} onClick={onSave}>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					fullWidth
					startIcon={<AddCircleOutline />}
					variant='outlined'
					color='success'
					onClick={() => setIsAddingEntry(true)}
				>
					Agregar tarea
				</Button>
			)}
		</Box>
	);
};
