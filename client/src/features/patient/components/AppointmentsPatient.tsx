import formatDateTime from '../../../app/components/formatDateTime';
import { Appointment } from '../../../app/Models/appointment';
import { Box, Card, CardContent } from '@mui/material';

interface Props {
    appointments: Appointment[];
}

// const formatDate = (dateString: any) => {
//     const date = new Date(dateString);
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     return `${hours}:${minutes}`;
// }

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
                                <span>{formatDateTime(latestAppointment.startDate)}</span>
                            </Box>
                            <Box className="details">
                                <strong>Appointment time: </strong>
                                <span>{latestAppointment.startDate} - {latestAppointment.endDate}</span>
                            </Box>
                            <Box className="details">
                                <strong>Description: </strong>
                                <span>{latestAppointment.description}</span>
                            </Box>
                            <Box className="details">
                                <strong>Appointment Type: </strong>
                                <span>{latestAppointment.appointmentType}</span>
                            </Box>
                            <Box className="details">
                                <strong>Location: </strong>
                                <span>{latestAppointment.location}</span>
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
