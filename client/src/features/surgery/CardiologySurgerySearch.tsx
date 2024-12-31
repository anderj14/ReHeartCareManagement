import { TextField, debounce, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setCardiologySurgeryByPatientParams, setCardiologySurgeryParams } from "./surgerySlice";

export function CardiologySurgeryByPatientSearch() {
  const { cardiologySurgeryParams } = useAppSelector(
    (state) => state.cardiologySurgery
  );
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
        id="search-bar"
        variant="outlined"
        placeholder="Search by patient name..."
        size="small"
        value={search || ""}
        onChange={handleSearchChange}
        className="textField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export function CardiologySurgerySearch() {
  const { cardiologySurgeryParams } = useAppSelector(
    (state) => state.cardiologySurgery
  );
  const [search, setSearch] = useState(cardiologySurgeryParams.search);
  const dispatch = useAppDispatch();

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setCardiologySurgeryByPatientParams({ search: value }));
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
        id="search-bar"
        variant="outlined"
        placeholder="Search by surgery name..."
        size="small"
        value={search || ""}
        onChange={handleSearchChange}
        className="textField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
