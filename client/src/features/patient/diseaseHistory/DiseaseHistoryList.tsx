import { Link, useParams } from "react-router-dom";
import { DiseaseHistory } from "../../../app/Models/DiseaseHistory";
import { useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { format } from "date-fns";

interface Props {
    diseaseHistories: DiseaseHistory[];
}

export default function DiseaseHistoryList({ diseaseHistories }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="disease history table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Start Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Description</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Treatment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {diseaseHistories.map((diseaseHistory) => (
                            <TableRow
                                key={diseaseHistory.id}
                                component={Link}
                                to={`/diseasehistory/patient/${patient?.id}/diseaseshistories/${diseaseHistory.id}`}
                                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">
                                    {diseaseHistory.startDate ? format(new Date(diseaseHistory.startDate), 'dd/MM/yyyy') : ''}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{diseaseHistory.description}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{diseaseHistory.treatment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
