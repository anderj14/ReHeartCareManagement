import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box, Button, List, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Breadcrumb({ page }: any) {

    const rightLinks = [
        { title: 'login', path: '/login' },
        { title: 'register', path: '/register' },
    ]

    return (
        <Box sx={{ margin: '20px 0 30px 0px', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#a0a0a0' }}>
                <HomeRoundedIcon sx={{ fontSize: '20px' }} />
                <ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} /> Dashboard <ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} />
                {page}
            </p>
            {/* <Box>
                <List sx={{ display: 'flex' }}>
                    {rightLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
            </Box> */}
        </Box>
    )
}
