import React, { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import '../../app/styles/appointment.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Appointment } from '../../app/Models/appointment';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { Box } from '@mui/material';
dayjs.extend(customParseFormat);
dayjs.extend(utc);


interface CustomDateHeaderProps {
  label: string;
}

const CustomDateHeader: React.FC<CustomDateHeaderProps> = ({ label }) => {
  const [date, day] = label.split(' ');

  return (
    <div className="rbc-header">
      <button type="button" className="rbc-button-link">
        <span className="rbc-date">{date}</span>
        <span className="rbc-day">{day}</span>
      </button>
    </div>
  );
};
const CustomToolbar = (toolbar: any) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const view = toolbar.view;
  const label = toolbar.label;


  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group time">
        <button onClick={goToBack}>
          <ArrowBackIosIcon />
        </button>
        <button onClick={goToToday}>
          Today
        </button>
        <button onClick={goToNext}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <span className="rbc-toolbar-label">{label}</span>
      <div className="rbc-btn-group">
        <button onClick={() => toolbar.onView('month')} className={view === 'month' ? 'rbc-active' : ''}>
          Month
        </button>
        <button onClick={() => toolbar.onView('week')} className={view === 'week' ? 'rbc-active' : ''}>
          Week
        </button>
        <button onClick={() => toolbar.onView('day')} className={view === 'day' ? 'rbc-active' : ''}>
          Day
        </button>
      </div>
    </div>
  );
};

interface CalendarEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  data: {
    patient: string;
    description: string;
    appointmentStatus: string;
  };
}

export default function Appointments() {

  const localizer = dayjsLocalizer(dayjs);
  const [appointments, setAppointments] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/v1/appointment/allappointments')
      .then(res => res.json())
      .then(data => {

        const transformedData = data.data.map((appointment: Appointment) => {
          const date = dayjs(appointment.date, 'YYYY-MM-DD');
          const time = dayjs(appointment.time, 'HH:mm:ss');
          const start = date.hour(time.hour()).minute(time.minute()).second(time.second()).toDate();
          const end = dayjs(start).add(1, 'hour').toDate();
          const title = `${appointment.patient}`;
          const eventData = {
            patient: appointment.patient,
            description: appointment.description,
            appointmentStatus: appointment.appointmentStatus,
          };
          return {
            id: appointment.id,
            start,
            end,
            title,
            data: eventData,
          };
        });

        console.log(transformedData);

        setAppointments(transformedData);
      });
  }, []);




  const components = {
    event: (props: any) => {
      const { data } = props.event;

      const backgroundColor = () => {
        switch (data.appointmentStatus) {
          case 'Scheduled':
            return '#F0A07C'; // Orange
          case 'Completed':
            return '#AED581'; // Green
          case 'Cancelled':
            return '#B0BEC5'; // Gray
          case 'Rescheduled':
            return '#90CAF9'; // Blue
          case 'No Show':
            return '#F48FB1'; // Pink
          default:
            return '#E0E0E0'; // Default gray
        }
      };
      console.log(data);
      return <Box style={{ backgroundColor: backgroundColor() }}>
        <p style={{ fontWeight: '500', fontSize: '15px' }}>{data.patient}</p>
        <p style={{ fontWeight: '300' }}>{data.description}</p>
        <p style={{ fontWeight: '400' }}>{data.appointmentStatus}</p>
      </Box>;
    },
    day: {
      header: CustomDateHeader
    }
  };

  const STEP = 5;
  const TIME_SLOTS = 30 / STEP;

  return (
    <div className="appointments-container" style={{ marginLeft: '30px', height: '95vh', width: '60vw' }}>
      <Calendar
        localizer={localizer}
        events={appointments}
        views={["month", "week", "day"]}
        components={{
          toolbar: CustomToolbar,
          ...components,
        }}
        step={STEP}
        timeslots={TIME_SLOTS}
      />
    </div>
  )
}
