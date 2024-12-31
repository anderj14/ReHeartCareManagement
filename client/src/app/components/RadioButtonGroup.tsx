import { Popper, Fade, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

interface Props {
    options: any[];
    onChange: (event: any) => void;
    [key: string]: any;
    selectedValue: string;
    id: any;
    open: any;
    anchorEl: any;
}

export default function RadioButtonGroup({ options, onChange, selectedValue, id, open, anchorEl, ...props }: Props) {
    return (
        <div>
            <Popper id={id} open={open} anchorEl={anchorEl} {...props} transition placement='bottom-end'>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <Box sx={{ border: "1px solid #ddd", p: 1, bgcolor: 'background.paper', marginTop: '10px', borderRadius: '4px' }}>
                            <FormControl>
                                <FormLabel id="demo-customized-radios">Sort</FormLabel>
                                <RadioGroup onChange={onChange} value={selectedValue}>
                                    {options.map(({ value, label }) => (
                                        <FormControlLabel value={value} control={<Radio />} label={label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>
    )
}
