import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import { Patient } from '../../app/Models/patient'
import { format } from 'date-fns';

interface Props {
    patient: Patient;
}
export default function PatientCard({ patient }: Props) {
    return (
        <Card sx={{ padding: 0.3 }} className='card'>
            <CardHeader
                title={patient.patientName}
            />
            <CardContent sx={{ marginTop: "-20px" }}>
                <div className="content" >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Data Birth:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                        {format(new Date(patient.dob), 'dd/MM/yyyy')}
                    </Typography>
                </div>
                <div className="content" >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Carnet Identification:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                        {patient.carnetIdentification}
                    </Typography>
                </div>
                <div className="content" >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Gender:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                        {patient.gender}
                    </Typography>
                </div>
                <div className="content" >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Social security:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                        {patient.socialSecurity}
                    </Typography>
                </div>
                <div className="content status">
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Status:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "green"}}>
                        Active
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}
