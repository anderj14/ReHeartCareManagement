
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { appointmentSelectors, fetchAppointmentsAsync, setAppointmentParams } from './appointmentSlice';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import Pager from '../../app/components/Pager';
import CardiologySurgerySearch from '../surgery/CardiologySurgerySearch';
import { setCardiologySurgeryParams } from '../surgery/surgerySlice';
import PaginationItem from "../../app/components/PaginationItem";
import Breadcrumb from '../../app/components/Breadcrumb';

const sortOptions = [
  { value: 'patientName', label: 'Alphabetical' },
  { value: 'dateAsc', label: 'Date - Asc to Desc' },
  { value: 'dateDesc', label: 'Date - Desc to Asc' },
]

export default function Appointments() {

  const appointments = useAppSelector(appointmentSelectors.selectAll);
  const { appointmentsLoaded, appointmentParams, metaData, status } = useAppSelector(state => state.appointment);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!appointmentsLoaded) dispatch(fetchAppointmentsAsync());
  }, [appointmentsLoaded, dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  return (
    <div className="contentAppointment">
      {/* <Breadcrumb page="appointments" /> */}
      <Box>
        <Typography variant="h4">Surgeries</Typography>
      </Box>
      <Card>
        <CardContent>
          <div className="filtersContainer">
            <Box>
              <Typography variant="h6">Surgery List</Typography>
              <div className="pager">
                {metaData && (
                  <Pager metaData={metaData} />
                )}
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>
              <div className="search">
                <CardiologySurgerySearch />
              </div>
              <div className="addPatientButton">
                <Button className="button" startIcon={<AddRoundedIcon />}>Add Surgery</Button>
              </div>
              <div className="addFilterButton">
                <Button className="button" startIcon={<SortRoundedIcon />} onClick={handleClick}>Filter</Button>
                <RadioButtonGroup
                  selectedValue={appointmentParams.sort}
                  options={sortOptions}
                  onChange={(e) => dispatch(setAppointmentParams({ sort: e.target.value }))}
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                />
              </div>
            </Box>
          </div>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: '20px' }}>
        {status === 'pendingFetchAppointmentsAsync' && (
          <Typography variant="h6">Loading Surgeries...</Typography>
        )}
        {appointmentsLoaded && appointments.length === 0 && (
          <Typography variant="h6">No Surgeries Found</Typography>
        )}
        {appointmentsLoaded && appointments.length > 0 && (
          <div className="surgeryList">
            {/* <CardiologySurgeryList cardiologySurgeries={appointments} /> */}
          </div>
        )}
      </Box>
      {appointmentsLoaded && (
        <Box marginTop={'30px'}>
          {metaData && (
            <PaginationItem
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setCardiologySurgeryParams({ pageIndex: page }))}
            />
          )}
        </Box>
      )}
    </div>
  )
}
