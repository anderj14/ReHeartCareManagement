import { TextField, IconButton, debounce } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { setCardiologySurgeryParams } from '../../surgery/surgerySlice';

export default function CardiologySurgerySearch() {
    const { cardiologySurgeryParams } = useAppSelector(state => state.cardiologySurgery);
    const [search, setSearch] = useState(cardiologySurgeryParams.search);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setCardiologySurgeryParams({ search: event.target.value }))
    }, 1000);

    return (
        <>
            <TextField
                label="Search by patient name"
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={search || ''}
                onChange={(event: any) => {
                    setSearch(event.target.value);
                    debouncedSearch(event);
                }}
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "#5a9580", fontSize: '30px' }} />
            </IconButton>
        </>
    )
}
