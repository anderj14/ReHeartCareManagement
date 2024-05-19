import { TextField, IconButton, debounce } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setPatientParams } from './patientSlice';
import { useState } from 'react';

export default function PatientSearch() {
    const { patientParams } = useAppSelector(state => state.patient);
    const [search, setSearch] = useState(patientParams.search);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setPatientParams({ search: event.target.value }))
    }, 1000);

    return (
        <>
            <TextField
                label="Search by name"
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
