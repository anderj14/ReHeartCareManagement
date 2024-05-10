import React from 'react';
import { Appointment } from '../../../app/Models/appointment';
import { Box, Card, CardContent } from '@mui/material';


interface Props {
    appointments: Appointment[];
}

export default function AppointmentsPatient({ appointments }: Props) {
    const latestAppointment = appointments?.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Appointment
                </h2>
                <div className="appointmentsDetails">
                    {latestAppointment && (
                        <div key={latestAppointment.id}>
                            <Box className="details">
                                <strong>Appointment date: </strong>
                                <span>{new Date(latestAppointment.date).toLocaleDateString()}</span>
                            </Box>
                            <Box className="details">
                                <strong>Appointment time: </strong>
                                <span>{latestAppointment.time}</span>
                            </Box>
                            <Box className="details">
                                <strong>Description: </strong>
                                <span>{latestAppointment.description}</span>
                            </Box>
                            <Box className="details">
                                <strong>Appointment Status: </strong>
                                <span>{latestAppointment.appointmentStatus}</span>
                            </Box>
                        </div>
                    )}
                </div>
            </CardContent>

        </Card>
    )
}
