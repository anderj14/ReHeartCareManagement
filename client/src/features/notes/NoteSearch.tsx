import { TextField, debounce, InputAdornment } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { useCallback, useState } from 'react';
import { setNoteParams } from './noteSlice';

export default function NoteSearch() {
    const { patientParams } = useAppSelector(state => state.patient);
    const [search, setSearch] = useState(patientParams.search);
    const dispatch = useAppDispatch();

    const debouncedSearch = useCallback(
        debounce((value) => {
            dispatch(setNoteParams({ search: value }));
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
                sx={{ width: '300px' }}
                id="search-bar"
                className="textField"
                // label="Search"
                variant="outlined"
                placeholder="Search Note..."
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={handleSearchChange}
            />
        </>
    )
}
