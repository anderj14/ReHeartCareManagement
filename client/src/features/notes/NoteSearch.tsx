import { TextField, debounce, InputAdornment } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { useCallback, useState } from 'react';
import { setNoteParams } from './noteSlice';

export default function NoteSearch() {
    const { noteParams } = useAppSelector(state => state.note);
    const [search, setSearch] = useState(noteParams.search);
    const dispatch = useAppDispatch();

    const debouncedSearch = useCallback(
        debounce((value) => {
            dispatch(setNoteParams({ search: value }));
        }, 1000),
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
                variant="outlined"
                placeholder="Search Note..."
                size="small"
                value={search || ''}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}
