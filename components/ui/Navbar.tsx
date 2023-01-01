import { FC, useContext } from 'react';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar: FC = () => {
	const { actionMenu } = useContext(UIContext);
	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton size='large' edge='start' onClick={actionMenu}>
					<MenuOutlinedIcon />
				</IconButton>
				<NextLink href='/'>
					<Link underline='none' color='White'>
						<Typography variant='h6' sx={{ cursor: 'pointer' }}>
							OpenJira
						</Typography>
					</Link>
				</NextLink>
			</Toolbar>
		</AppBar>
	);
};
