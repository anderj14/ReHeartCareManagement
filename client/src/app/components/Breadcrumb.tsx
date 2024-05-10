import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box } from '@mui/material';
export default function Breadcrumb({ page }: any) {
    return (
        <Box sx={{margin: '20px 0 30px 0px'}}>
            <p style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#a0a0a0' }}>
                <HomeRoundedIcon sx={{ fontSize: '20px' }} />
                <ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} /> Dashboard <ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} />
                {page}
            </p>
        </Box>
    )
}
