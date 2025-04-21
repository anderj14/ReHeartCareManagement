import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CustomCardProps{
    title: string;
    icon?: ReactNode,
    value?: string | number;
    description?: string;
    children?: ReactNode
}

export default function CustomCard({title, icon, value, description, children}: CustomCardProps)
{
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent
                sx={{
                    padding: '20px',
                }}
            >
                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {title}
                    {icon}
                </Typography>
                {value && (
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {value}
                    </Typography>
                )}
                {description && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
                {children}
            </CardContent>
        </Card>
    )
}


export function DetailCard({
    title,
    icon,
    children,
    highlighted = false,
    highlightColor = '#000',
    borderColor = '#fae624',
    backgroundColor = '#FEFCE8',
  }: {
    title: string;
    icon?: ReactNode;
    children?: ReactNode;
    highlighted?: boolean;
    highlightColor?: string;
    borderColor?: string;
    backgroundColor?: string;
  }) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            minHeight: '80px',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontWeight: 'bold',
            }}
          >
            {icon && <span style={{color: highlightColor}}>{icon}</span>}
            {title}
          </Typography>
          {highlighted ? (
            <Box
                sx={{
                backgroundColor: backgroundColor,
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                padding: '15px',
                marginTop: '10px',
                }}
            >
                <Typography>{children}</Typography>
            </Box>
            ) : (
                <Typography variant="body2">
                    {children}
                </Typography>
            )}
        </CardContent>
      </Card>
    );
  }