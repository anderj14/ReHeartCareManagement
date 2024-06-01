import { Link, useParams } from "react-router-dom";
import { HolterStudy } from "../../../app/Models/holterStudy";
import { useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { format } from "date-fns";

interface Props {
    holterStudies: HolterStudy[];
}

export default function HolterStudyList({ holterStudies }: Props) {

    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="patient table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Time</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Study Duration</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Average Heart Rate</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Maximum Heart Rate</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Type of Heart Rhythm</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {holterStudies.map((holterStudy) => (
                            <TableRow key={holterStudy.id} component={Link} to={`/holterstudy/patient/${patient?.id}/holterStudies/${holterStudy.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{holterStudy.date ? format(new Date(holterStudy.date), 'dd/MM/yyyy') : ''}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.time}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.studyDuration}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.averageHeartRate}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.maximumHeartRate}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.typeHeartRhythm}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
