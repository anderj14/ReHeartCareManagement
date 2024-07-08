import { useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import '../../app/styles/appointment.scss';
import { Box, Button, Typography, Divider, IconButton, CardContent, Modal, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { appointmentSelectors, fetchAppointmentsCalendarAsync } from './appointmentSlice';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { Appointment } from '../../app/Models/appointment';
import CustomToolbar from './CustomToolbar';
import HeaderAppointment from './HeaderAppointment';
import EventCard from './EventCard';
import CustomDateHeader from './CustomDateHeader';
import CircleIcon from './CircleIcon';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import getBorderColor from './getBorderColor';
import CircleIcons from '@mui/icons-material/Circle';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import formatDateTime from '../../app/components/formatDateTime';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default function AppointmentCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(appointmentSelectors.selectAll);
  const { appointmentsLoaded } = useAppSelector((state) => state.appointment);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    if (!appointmentsLoaded) dispatch(fetchAppointmentsCalendarAsync());
  }, [appointmentsLoaded, dispatch]);

  const transformAppointment = (appointments: Appointment[]) => {
    return appointments.map((appointment: Appointment) => {
      const start = new Date(appointment.startDate);
      const end = new Date(appointment.endDate);
      const title = `${appointment.patient}`;
      const eventData = {
        id: appointment.id,
        patient: appointment.patient,
        patientEmail: appointment.patientEmail,
        patientPhone: appointment.patientPhone,
        patientAddress: appointment.patientAddress,
        userDoctor: appointment.userDoctor,
        description: appointment.description,
        appointmentStatus: appointment.appointmentStatus,
        appointmentType: appointment.appointmentType,
        location: appointment.location,
        start: appointment.startDate,
        end: appointment.endDate
      };

      return {
        id: appointment.id,
        start,
        end,
        title,
        data: eventData,
      };
    });
  };

  const components = {
    event: (props: any) => {
      const { data } = props.event;
      return <EventCard data={data} />;
    },
    day: {
      header: CustomDateHeader,
    },
  };

  const STEP = 5;
  const TIME_SLOTS = 30 / STEP;

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event.data);
  }

  const handleClose = () => {
    setSelectedEvent(null);
  };

  // const formatDateTime = (date: string) => {
  //   return dayjs(date).isValid() ? dayjs(date).format('MMMM D, YYYY h:mm A') : 'Invalid Date';
  // };

  return (
    <div className="appointments-container" style={{ height: '100vh' }}>
      <div className="calendar">
        <Box className="title" sx={{ marginTop: 3 }}>
          <Typography variant='h4'>Appointments Calendar</Typography>
          <Typography variant='body1' color={'text.secondary'} textTransform={'initial'}>
            There is the latest update for the last month
          </Typography>
        </Box>
        <Box className="header">
          <Box>
            <Button className='add' sx={{ padding: 0 }} startIcon={<AddRoundedIcon />}>New Event</Button>
          </Box>
          <HeaderAppointment />
        </Box>
        <Calendar
          localizer={localizer}
          events={transformAppointment(appointments)}
          views={['month', 'week', 'day']}
          components={{
            toolbar: CustomToolbar,
            ...components,
          }}
          step={STEP}
          timeslots={TIME_SLOTS}
          onSelectEvent={handleSelectEvent}
          style={{ height: '100%' }} // Ensure the calendar takes full height
        />
        {selectedEvent && (
          <Modal open={Boolean(selectedEvent)} onClose={handleClose}>
            <Paper className="modal-container" sx={{ borderRadius: '10px' }}>
              <Box className="modal-content">
                <Box className="modal-header">
                  <Typography sx={{ fontSize: '16px', display: 'flex', alignItems: 'center' }} color="text.secondary">
                    Reservation ID <strong style={{ fontSize: '21px', color: '#000', marginLeft: '5px' }}>#{selectedEvent.id}</strong>
                    <CircleIcons sx={{ fontSize: '5px', margin: '8px', color: getBorderColor(selectedEvent.appointmentStatus) }} />
                    <span>Manual Appointment</span>
                  </Typography>
                  <div className="actions">
                    <IconButton onClick={handleClose} color="primary" className="modal-edit-button">
                      <EditIcon />
                    </IconButton>
                    <span style={{ color: '#eee' }}>|</span>
                    <IconButton onClick={handleClose} color="primary" className="modal-close-button">
                      <CloseIcon />
                    </IconButton>
                  </div>
                </Box>
                <Box className="modal-body">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircleIcon name={selectedEvent.patient} />
                    <div className="title">
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Patient name
                      </Typography>
                      <Typography sx={{ fontSize: 22 }}>{selectedEvent.patient}</Typography>
                    </div>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14, marginRight: '15px' }} color="text.secondary">Status</Typography>
                    <Box className="status" sx={{
                      borderColor: getBorderColor(selectedEvent.appointmentStatus),
                      borderWidth: 2,
                      borderStyle: 'solid',
                      borderRadius: 1,
                      padding: '5px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 18
                    }}>
                      <CircleIcons sx={{ fontSize: '10px', marginRight: '5px', color: getBorderColor(selectedEvent.appointmentStatus) }} />
                      {selectedEvent.appointmentStatus}
                    </Box>
                  </Box>
                </Box>
                <CardContent className="appointment-info">
                  <Box sx={{ marginRight: "50px", display: 'flex', alignItems: 'start' }}>
                    <AccessTimeIcon sx={{ fontSize: '25px', color: "rgba(0, 0, 0, 0.800)", backgroundColor: 'rgba(0, 0, 0, 0.100)', padding: '5px', borderRadius: '8px' }} />
                    <div className="info">
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase' }} color="text.secondary">Date And Time</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                        {selectedEvent.start && selectedEvent.end ?
                          `${formatDateTime(selectedEvent.start)} - ${formatDateTime(selectedEvent.end)}`
                          : 'No Date Info'}
                      </Typography>
                    </div>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'start' }}>
                    <PersonOutlineIcon sx={{ fontSize: '25px', color: "rgba(0, 0, 0, 0.800)", backgroundColor: 'rgba(0, 0, 0, 0.100)', padding: '5px', borderRadius: '8px' }} />
                    <div className="info">
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase' }} color="text.secondary">Doctor</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Dr. {selectedEvent.userDoctor}</Typography>
                    </div>
                  </Box>
                </CardContent>
                <CardContent className="appointment-info">
                  <Box sx={{ display: 'flex', alignItems: 'start' }}>
                    <LocationOnIcon sx={{ fontSize: '25px', color: "rgba(0, 0, 0, 0.800)", backgroundColor: 'rgba(0, 0, 0, 0.100)', padding: '5px', borderRadius: '8px' }} />
                    <div className="info">
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase' }} color="text.secondary">Location</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Dr. {selectedEvent.location}</Typography>
                    </div>
                  </Box>
                </CardContent>
                <Divider />
                <CardContent className="general-info">
                  <Typography sx={{ fontSize: 16, }}>General Info</Typography>
                  <div className="patient-info">
                    <div className="info">
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">Full Name</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{selectedEvent.patient}</Typography>
                    </div>
                    <div className="info">
                      <Typography sx={{ fontSize: 13 }} color="text.secondary">Phone</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{selectedEvent.patientPhone}</Typography>
                    </div>
                    <div className="info">
                      <Typography sx={{ fontSize: 13 }} color="text.secondary">Email</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{selectedEvent.patientEmail}</Typography>
                    </div>
                    <div className="info">
                      <Typography sx={{ fontSize: 13 }} color="text.secondary">Patient Address</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{selectedEvent.patientAddress}</Typography>
                    </div>
                  </div>
                </CardContent>
              </Box>
            </Paper>
          </Modal>
        )}
      </div>
    </div>
  );
}
