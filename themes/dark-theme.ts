import { createTheme } from '@mui/material';
import pink from '@mui/material/colors/pink';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#4a148c',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: pink[700],
		},
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
			},
			styleOverrides: {
				root: {
					backgroundColor: '#4a148c',
				},
			},
		},
	},
});
