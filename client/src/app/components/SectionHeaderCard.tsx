import { Box, CardContent, Typography } from "@mui/material";
import React from "react";

type InfoItem = {
    icon: React.ReactNode;
    text: string;
}

type SectionHeaderCardProps ={
    mainIcon: React.ReactNode;
    secondaryIcon: React.ReactNode;
    mainTitle: string;
    subtitle?:string;
    infoItems: InfoItem[];
    backgroundGradient?: string;
};

export const SectionHeaderCard = ({
    mainIcon,
    secondaryIcon,
    mainTitle,
    subtitle,
    infoItems = [],
    backgroundGradient = 'linear-gradient(#a7d7c5, #fff)',
}: SectionHeaderCardProps) => {
    return (
<CardContent
      sx={{
        backgroundImage: backgroundGradient,
        padding: { xs: '20px', sm: '30px' },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
            {mainIcon}
            <Typography fontWeight="600" fontSize="20px">
              {mainTitle}
            </Typography>
          </Box>
          {subtitle && (
            <Typography
                sx={{ marginTop: '5px', fontSize: '18px' }} 
                color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box>
            {secondaryIcon && 
            React.cloneElement(secondaryIcon as React.ReactElement,
            { style: { fontSize: 65, color: '#3b82f6' } })}
        </Box>
      </Box>

      {infoItems.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '5px' }}>
          {infoItems.map((item, idx) => (
            <Typography
              key={idx}
              variant="body1"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {item.icon}
              <span>{item.text}</span>
            </Typography>
          ))}
        </Box>
      )}
    </CardContent>
    )
}