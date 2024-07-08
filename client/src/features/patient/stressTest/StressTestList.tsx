import { Link, useParams } from "react-router-dom";
import { StressTest } from "../../../app/Models/stressTest";
import { useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import formatDateTime from "../../../app/components/formatDateTime";

interface Props {
    stressTest: StressTest[];
}

export default function StressTestList({ stressTest }: Props) {

    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="stress test">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Time</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Duration</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Max Heart Rate</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Peak Pressure</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Resting Heart Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {stressTest.map((stressTest) => (
                            <TableRow
                                key={stressTest.id}
                                component={Link}
                                to={`/stresstest/patient/${patient?.id}/stresstests/${stressTest.id}`}
                                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{formatDateTime(stressTest.date)}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{stressTest.time}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{stressTest.duration}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{stressTest.maxHeartRate} bpm</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{stressTest.peakPressure}mmHg</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{stressTest.restingHeartRate} bpm</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    )

}