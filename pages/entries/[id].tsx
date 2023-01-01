import SaveOutlined from '@mui/icons-material/SaveOutlined';
import { useContext, useMemo, useState } from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { GetServerSideProps } from 'next';
import {
	FormControlLabel,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormLabel,
	Grid,
	RadioGroup,
	TextField,
	Radio,
	capitalize,
	IconButton,
} from '@mui/material';

import { Layout } from '../../components/layouts/Layout';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';
import { useRouter } from 'next/router';

const allowedStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

interface EntryPageProps {
	entry: Entry;
}

const EntryPage: React.FC<EntryPageProps> = ({ entry }) => {
	const [inputValue, setInputValue] = useState<string>(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState<boolean>();

	const { updateEntry, deleteEntry, refreshEntries } = useContext(EntriesContext);
	const router = useRouter();

	const isNotValid = useMemo(() => !inputValue && touched, [inputValue, touched]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value as EntryStatus);
	};

	const onSave = () => {
		if (inputValue.trim().length === 0) return;
		updateEntry({ ...entry, description: inputValue, status }, true);

		setTouched(false);
	};

	const removeEntry = () => {
		deleteEntry(entry._id);
		refreshEntries();
		router.replace('/');
	};

	return (
		<Layout title={inputValue.substring(0, 20) + '...'}>
			<Grid container justifyContent='center' sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader title={`${inputValue}`} subheader={`Creada ${dateFunctions.formatDate(entry.createdAt)}`} />

						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='Nueva entrada'
								autoFocus
								multiline
								label='Nueva entrada'
								value={inputValue}
								onChange={handleInputChange}
								helperText={isNotValid ? 'El campo es requerido' : ''}
								error={!inputValue && touched}
								onBlur={() => setTouched(true)}
							/>

							<FormControl>
								<FormLabel>Estado: </FormLabel>
								<RadioGroup row value={status} onChange={onStatusChange}>
									{allowedStatus.map(status => (
										<FormControlLabel key={status} value={status} control={<Radio />} label={capitalize(status)} />
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlined />}
								fullWidth
								variant='contained'
								color='secondary'
								onClick={onSave}
								disabled={!inputValue}
							>
								Guardar
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton
				sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
				onClick={removeEntry}
			>
				<DeleteOutline />
			</IconButton>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			entry,
		},
	};
};

export default EntryPage;
