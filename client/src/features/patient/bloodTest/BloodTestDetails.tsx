import { Card, CardContent, Box, Typography, CardActions, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Tooltip, Drawer } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { bloodTestSelectors, fetchBloodTestByPatientAsync, removeBloodTest } from './bloodTestSlice';
import NotFound from '../../../app/errors/NotFound';
import formatDateTime from '../../../app/components/formatDateTime';
import '../../../app/styles/main.scss';
import CustomButton from '../../../app/components/CustomButton';
import Subtitle from '../../../app/components/Subtitle';
import { LuPenLine } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';
import { RiCheckboxCircleLine, RiErrorWarningLine } from 'react-icons/ri';
import { BiDonateBlood } from "react-icons/bi";
import { BloodTest } from '../../../app/Models/bloodTest';
import BloodTestForm from './BloodTestForm';
import agent from '../../../app/api/agent';


export default function BloodTestDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, bloodTestId } = useParams<{ id: string, bloodTestId: string }>();
    const patientIdNumber = Number(patientId);
    const bloodTestIdNumber = Number(bloodTestId);

    const { status: bloodTestsByPatientStatus } = useAppSelector(state => state.bloodTest);
    const bloodTestByPatient = useAppSelector((state) =>
        bloodTestIdNumber ? bloodTestSelectors.selectById(state, bloodTestIdNumber) : undefined
    );
    const [selectedBloodTest, setSelectedBloodTest] = useState<BloodTest | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [target, setTarget] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBloodTestByPatientId = async () => {
            if (patientIdNumber !== undefined && bloodTestIdNumber !== undefined && !bloodTestByPatient) {
                dispatch(fetchBloodTestByPatientAsync({ patientId: patientIdNumber, bloodTestId: bloodTestIdNumber }));
            }
        }

        fetchBloodTestByPatientId();
      
    }, [dispatch, patientIdNumber, bloodTestIdNumber, bloodTestByPatient, bloodTestsByPatientStatus]);

    if (bloodTestsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!bloodTestByPatient) return <NotFound />;

    const getStatus = (result: number, min: number, max: number) => {
      if(result <= min) return 'Low';
      if(result >= max) return 'High';
      return 'Normal';
    }

    const bloodTests = [
        { name: "Hemoglobin", value: bloodTestByPatient?.hemoglobin, range: [13.8, 17.2], unit: "g/dL" },
        { name: "Hematocrit", value: bloodTestByPatient?.hematocrit, range: [40.7, 50.3], unit: "%" },
        { name: "White Blood Cell", value: bloodTestByPatient?.whiteBloodCell, range: [4500, 11000], unit: "cells/µL" },
        { name: "Platelets", value: bloodTestByPatient?.platelets, range: [150000, 450000], unit: "cells/µL" },
        { name: "Glucose", value: bloodTestByPatient?.glucose, range: [70, 99], unit: "mg/dL" },
        { name: "Cholesterol HDL", value: bloodTestByPatient?.cholesterolHDL, range: [40, Infinity], unit: "mg/dL" },
        { name: "Cholesterol LDL", value: bloodTestByPatient?.cholesterolLDL, range: [0, 100], unit: "mg/dL" },
        { name: "Triglycerides", value: bloodTestByPatient?.triglycerides, range: [0, 150], unit: "mg/dL" },
        { name: "Red Blood Cell", value: bloodTestByPatient?.redBloodCell, range: [4.7, 6.1], unit: "million/uL" },
        { name: "Mean Corpuscular Volume", value: bloodTestByPatient?.meanCorpuscularVolume, range: [80, 100], unit: "fL" },
        { name: "Mean Corpuscular Hemoglobin", value: bloodTestByPatient?.meanCorpuscularHemoglobin, range: [27, 33], unit: "pg" },
        { name: "Mean Corpuscular Hemoglobin Concentration", value: bloodTestByPatient?.meanCorpuscularHemoglobinConcentration, range: [32, 36], unit: "g/dL" },
        { name: "Red Cell Distribution Width", value: bloodTestByPatient?.redCellDistributionWidth, range: [11.5, 14.5], unit: "%" },
        { name: "Blood Urea Nitrogen", value: bloodTestByPatient?.bloodUreaNitrogen, range: [6, 20], unit: "mg/dL" },
        { name: "Creatinine", value: bloodTestByPatient?.creatinine, range: [0.7, 1.3], unit: "mg/dL" },
        { name: "Sodium", value: bloodTestByPatient?.sodium, range: [135, 145], unit: "mEq/L" },
        { name: "Potassium", value: bloodTestByPatient?.potassium, range: [3.5, 5.0], unit: "mEq/L" },
        { name: "Chloride", value: bloodTestByPatient?.chloride, range: [96, 106], unit: "mEq/L" },
        { name: "Bicarbonate", value: bloodTestByPatient?.bicarbonate, range: [22, 29], unit: "mEq/L" },
        { name: "Calcium", value: bloodTestByPatient?.calcium, range: [8.6, 10.2], unit: "mg/dL" },
        { name: "Magnesium", value: bloodTestByPatient?.magnesium, range: [1.7, 2.2], unit: "mg/dL" },
      ];
      const differentials =[
        { name: "Neutrophils", value: bloodTestByPatient?.neutrophils, range: [40, 60], unit: "%" },
        { name: "Lymphocytes", value: bloodTestByPatient?.lymphocytes, range: [20, 40], unit: "%" },
        { name: "Monocytes", value: bloodTestByPatient?.monocytes, range: [2, 8], unit: "%" },
        { name: "Eosinophils", value: bloodTestByPatient?.eosinophils, range: [1, 4], unit: "%" },
        { name: "Basophils", value: bloodTestByPatient?.basophils, range: [0, 1], unit: "%" },
      ]
      
    const getBackgroundColor = (value: any, min: any, max: any) => {
        if (value <= min) return "#ffe6cc";
        if (value >= max) return "#ffcccc";
    };

    const getColor = (value: any, min: any, max: any) => {
        if (value <= min) return "#DE8B3D";
        if (value >= max) return "#fc4545";
        return "#37A349"
    };
    const getIcon = (value: any, min: any, max: any) => {
        if (value <= min) return <RiErrorWarningLine color="#DE8B3D" />;
        if (value >= max) return <RiErrorWarningLine color="#fc4545" />;
        return <RiCheckboxCircleLine color="#37A349" />;
    };
      
    const getTooltipText = (value: any, min: any, max: any) => {
        if (value <= min) return "Low: Intervention required.";
        if (value >= max) return "High: Intervention required.";
        return "Low: No intervention required.";
    };

    const getAbnormalResults = (tests: any) => {
        return tests.filter((test: any) => {
          const value = test.value || 0;
          const [min, max] = test.range;
          return value <= min || value >= max;
        });
    };

    const abnormalResults = getAbnormalResults(bloodTests);
    const abnormalDifferential = getAbnormalResults(differentials);

    const handleEditClick = () => {
        if(bloodTestByPatient) {
            setSelectedBloodTest(bloodTestByPatient);
            setEditMode(true);
        }
    }

    const toggleDrawer = () => {
        setEditMode(false);
    }

    function handleDeleteBloodTest(id: number) {
        setTarget(id);
        agent.BloodTest.deleteBloodTest(id)
        .then(() => {
            dispatch(removeBloodTest(id));
            navigate(`/bloodtests/patient/${patientIdNumber}/bloodtests`);
        })
        .catch(error => console.log(error));

    }

    return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Box sx={{margin: '30px 0px 30px 0px'}}>
            <Card sx={{ width: '1000px'}}>
            <CardContent sx={{backgroundImage: 'linear-gradient(#a7d7c5, #fff)', padding: '30px'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {bloodTestByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Blood Test | {formatDateTime(bloodTestByPatient.date)}
                        </Typography>
                    </Box>
                    <Box sx={{fontSize: '55px', color: '#EF4444'}}>
                        <BiDonateBlood />
                    </Box>
                </Box>
                {(abnormalResults.length > 0 || abnormalDifferential.length > 0) && (
                    <Box sx={{backgroundColor: '#FEFCE8', border: '1px solid #FEFBEB', borderRadius: '4px', padding: '15px', marginTop: '10px'}}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#92400D", marginBottom: 2 }}>
                            Attention Required
                        </Typography>
                        {abnormalResults.map((test: any, index: any) => (
                            <Typography key={index} variant="body2" sx={{color: '#B45308'}}>
                            {test.name}: {test.value} {test.unit} ({test.value < test.range[0] ? "Low" : "High"})
                            </Typography>
                        ))}
                        {abnormalDifferential.map((test: any, index: any) => (
                            <Typography key={index} variant="body2" sx={{color: '#B45308'}}>
                            {test.name}: {test.value} {test.unit} ({test.value < test.range[0] ? "Low" : "High"})
                            </Typography>
                        ))}
                    </Box>
                )}
            </CardContent>
            <CardContent sx={{marginTop: '-30px'}}>
                <TableContainer>
                    <Box>
                        <Subtitle subtitle={"Blood Test"} />
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell sx={{color: '#71717a'}}>Test</TableCell>
                                <TableCell sx={{color: '#71717a'}} align="right">Result</TableCell>
                                <TableCell sx={{color: '#71717a'}} align="right">Reference Range</TableCell>
                                <TableCell sx={{color: '#71717a'}} align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{fontSize: '28px'}}>
                                {bloodTests.map((test, index) => (
                                    <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: getBackgroundColor(test.value, test.range[0], test.range[1]),
                                    }}
                                    >
                                        <TableCell sx={{ fontWeight: "500" }}>{test.name}</TableCell>
                                        <TableCell align="right">{test.value} <span>{test.unit}</span></TableCell>
                                        <TableCell align="right">{test.range[0]} - {test.range[1]} <span>{test.unit}</span>
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: getColor(test.value, test.range[0], test.range[1]) }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Tooltip title={getTooltipText(test.value, test.range[0], test.range[1])}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        lineHeight: 0,
                                                    }}
                                                >
                                                    {getIcon(test.value, test.range[0], test.range[1])}
                                                </Box>
                                                </Tooltip>
                                                <span>{getStatus(test.value, test.range[0], test.range[1])}</span>
                                            </Box>
                                        </TableCell>                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    <Box sx={{marginTop: '30px'}}>
                        <Subtitle subtitle={"Differential"} />
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell sx={{color: '#71717a'}}>Test</TableCell>
                                <TableCell sx={{color: '#71717a'}} align="right">Result</TableCell>
                                <TableCell sx={{color: '#71717a'}} align="right">Reference Range</TableCell>
                                <TableCell sx={{color: '#71717a'}} align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{fontSize: '28px'}}>
                                {differentials.map((test, index) => (
                                    <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: getBackgroundColor(test.value, test.range[0], test.range[1]),
                                    }}
                                    >
                                        <TableCell sx={{ fontWeight: "500" }}>{test.name}</TableCell>
                                        <TableCell align="right">{test.value} <span>{test.unit}</span></TableCell>
                                        <TableCell align="right">{test.range[0]} - {test.range[1]} <span>{test.unit}</span>
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: getColor(test.value, test.range[0], test.range[1]) }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Tooltip title={getTooltipText(test.value, test.range[0], test.range[1])}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        lineHeight: 0,
                                                    }}
                                                >
                                                    {getIcon(test.value, test.range[0], test.range[1])}
                                                </Box>
                                                </Tooltip>
                                                <span>{getStatus(test.value, test.range[0], test.range[1])}</span>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            </CardContent>
            <CardActions sx={{marginTop: '20px' }}>
                <CustomButton
                    icon={LuPenLine}
                    color="#fff"
                    width="130px"
                    bg="#2377cb"
                    borderColor="transparent"
                    hoverColor="#1261a2"
                    onClick={handleEditClick}
                >
                    Update
                </CustomButton>
                <CustomButton
                    icon={MdOutlineDelete}
                    color="#dc3737"
                    width="130px"
                    bg="transparent"
                    borderColor="#dc3737"
                    hoverColor="transparent"
                    onClick={() => handleDeleteBloodTest(bloodTestByPatient!.id)}
                >
                    Delete
                </CustomButton>
            </CardActions>
            <Drawer anchor='right' open={editMode} onClose={toggleDrawer}>
                <Box sx={{width: 600, p:2}}>
                    <BloodTestForm 
                        test={selectedBloodTest}
                        cancelEdit={toggleDrawer}
                        title={'Editing Blood Test'}
                        patientId={patientIdNumber}
                    />
                </Box>
            </Drawer>
            </Card>
        </Box >
      </Box>
    )
}