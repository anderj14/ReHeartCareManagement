import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Patient } from "../../app/Models/patient";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Props {
    patients: Patient[];
}

export default function PatientList({ patients }: Props) {
    const history = useNavigate();

    const handleRowClick = (patientId: number) => {
        console.log(patientId);

        history(`/patients/${patientId}`);
    }


    return (
        <TableContainer component={Paper} className="table">
            <Table aria-label="patient table">
                <TableHead>
                    <TableRow className="row">
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Patient Name</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Carnet Identification</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">DOB</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Gender</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Address</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Phone</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Email</TableCell>
                        <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Social Security</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="body">
                    {patients.map((patient) => (
                        <TableRow key={patient.id} onClick={() => handleRowClick(patient.id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">
                                {patient.patientName}
                            </TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.carnetIdentification}</TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.dob ? format(new Date(patient.dob), 'dd/MM/yyyy') : ''}</TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.gender}</TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.address}</TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.phone}</TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.email}</TableCell>
                            <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{patient.socialSecurity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>



    );
}
