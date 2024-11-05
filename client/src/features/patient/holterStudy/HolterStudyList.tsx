import { Link, useNavigate, useParams } from "react-router-dom";
import { HolterStudy } from "../../../app/Models/holterStudy";
import { useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import formatDateTime from "../../../app/components/formatDateTime";

interface Props {
    holterStudies: HolterStudy[];
}

export default function HolterStudyList({ holterStudies }: Props) {

    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (bloodTestId: string) => {
        navigate(`/holterstudy/patient/${patient?.id}/holterstudies/${bloodTestId}`);
    };

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
                            <TableRow 
                            key={holterStudy.id}  
                            onClick={() => handleRowClick(holterStudy.id.toString())}
                            style={{cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{formatDateTime(holterStudy.date)}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.time}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.studyDuration}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.averageHeartRate} BPM</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.maximumHeartRate} BPM</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{holterStudy.typeHeartRhythm}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
