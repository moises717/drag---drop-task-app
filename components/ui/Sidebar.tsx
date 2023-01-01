import { useContext } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { UIContext } from "../../context/ui";

const menuItems: string[] = ['Inbox', ' Starred', 'Send Email']

export const Sidebar = () => {
    const { sideMenuOpen, actionMenu } = useContext(UIContext)
    return (
        <Drawer anchor="left" open={sideMenuOpen} onClose={actionMenu}>
            <Box sx={{ width: 250 }}>
            </Box>
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant="h4">
                    Menu
                </Typography>
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text} >
                                <ListItemIcon>
                                    {
                                        index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text} >
                                <ListItemIcon>
                                    {
                                        index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
