import { TextField, IconButton, debounce } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setCardiologySurgeryParams } from './surgerySlice';

export default function CardiologySurgerySearch() {
    const { cardiologySurgeryParams } = useAppSelector(state => state.cardiologySurgery);
    const [search, setSearch] = useState(cardiologySurgeryParams.search);
    const dispatch = useAppDispatch();

    const debouncedSearch = useCallback(
        debounce((value) => {
            dispatch(setCardiologySurgeryParams({ search: value }));
        }, 1500),
        []
    );
    const handleSearchChange = (event: any) => {
        setSearch(event.target.value);
        debouncedSearch(event.target.value);
    };

    return (
        <>
            <TextField
                label="Search by patient name"
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={search || ''}
                onChange={handleSearchChange}
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "#5a9580", fontSize: '30px' }} />
            </IconButton>
        </>
    )
}
