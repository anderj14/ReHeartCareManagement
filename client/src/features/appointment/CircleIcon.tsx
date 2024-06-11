import React from 'react';
import { Box, Typography } from '@mui/material';

interface InitialCircleIconProps {
  name: string;
}

const CircleIcon: React.FC<InitialCircleIconProps> = ({ name }) => {
    const getInitials = (name: string) => {
      const names = name.split(' ');
      const initials = names.map((n) => n[0]).join('');
      return initials;
    };
  
    const initials = getInitials(name);
  
    return (
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#4d7997',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>{initials}</Typography>
      </Box>
    );
  };
  
  export default CircleIcon;