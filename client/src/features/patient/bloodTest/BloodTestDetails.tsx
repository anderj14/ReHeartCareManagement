import { Card, CardContent, Box, Typography, Button, CardActions, Paper, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, capitalize } from '@mui/material';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Breadcrumb from '../../../app/components/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { bloodTestSelectors, fetchBloodTestByPatientAsync } from './bloodTestSlice';
import NotFound from '../../../app/errors/NotFound';
import { patientSelectors } from '../patientSlice';
import formatDateTime from '../../../app/components/formatDateTime';
import '../../../app/styles/main.scss';
import CustomButton from '../../../app/components/CustomButton';


export default function BloodTestDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, bloodTestId } = useParams<{ id: string, bloodTestId: string }>();
    const patientIdNumber = Number(patientId);
    const bloodTestIdNumber = Number(bloodTestId);

    const { status: bloodTestsByPatientStatus } = useAppSelector(state => state.bloodTest);
    const bloodTestByPatient = useAppSelector((state) =>
        bloodTestIdNumber ? bloodTestSelectors.selectById(state, bloodTestIdNumber) : undefined
    );
    const patient = useAppSelector(state => patientSelectors.selectById(state, patientIdNumber));

    useEffect(() => {
        if (patientIdNumber && bloodTestIdNumber && !bloodTestByPatient) {
            dispatch(fetchBloodTestByPatientAsync({ patientId: patientIdNumber, bloodTestId: bloodTestIdNumber }));
        }
    }, [dispatch, patientIdNumber, bloodTestIdNumber, bloodTestByPatient]);


    if (bloodTestsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!bloodTestByPatient) return <NotFound />;

    const getStatus = (result: number, min: number, max: number) => {
      if(result <= min) return 'Low';
      if(result >= max) return 'High';
      return 'Normal';
    }

    return (
      <Box sx={{ margin: '30px 0px 30px 30px' }}>
        <Breadcrumb page="Blood Tests" />
        <Card sx={{ maxWidth: 745, padding: '20px' }}>
          <CardContent>
            <Box>
              <Typography gutterBottom variant="h5" key={patient?.id}>
                  {patient?.patientName}
              </Typography>
              <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                  Blood Test | {formatDateTime(bloodTestByPatient.date)}
              </Typography>
            </Box>
            <TableContainer component={Paper} sx={{marginTop: '20px'}}>
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
                  <TableRow>
                    <TableCell sx={{fontWeight: '500'}}>Hemoglobin</TableCell>
                    <TableCell align="right">{bloodTestByPatient?.hemoglobin}</TableCell>
                    <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}> 13.8 - 17.2 <Typography variant='body2' sx={{textTransform: 'none'}}> g/dL</Typography></TableCell>
                    <TableCell align="right">{getStatus(bloodTestByPatient?.hemoglobin, 13.8, 17.2)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Hematocrit</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.hematocrit}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>40.7 - 50.3 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.hematocrit, 40.7, 50.3)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>White Blood Cell</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.whiteBloodCell}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>4500 - 11000 <Typography variant='body2' sx={{textTransform: 'none'}}>cells/µL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.whiteBloodCell, 4500, 11000)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Platelets</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.platelets}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>150000 - 450000 <Typography variant='body2' sx={{textTransform: 'none'}}>cells/µL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.platelets, 150000, 450000)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Glucose</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.glucose}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>70 - 99 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.glucose, 70, 99)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Cholesterol HDL</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.cholesterolHDL}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>&gt; 40 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.cholesterolHDL, 40, Infinity)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Cholesterol LDL</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.cholesterolLDL}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>&lt; 100 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.cholesterolLDL, 0, 100)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Triglycerides</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.triglycerides}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>&lt; 150 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.triglycerides, 0, 150)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Red Blood Cell</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.redBloodCell}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>4.7 - 6.1 <Typography variant='body2' sx={{textTransform: 'none'}}>million/uL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.redBloodCell, 4.7, 6.1)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Mean Corpuscular Volume</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.meanCorpuscularVolume}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>80 - 100 <Typography variant='body2' sx={{textTransform: 'none'}}>fL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.meanCorpuscularVolume, 80, 100)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Mean Corpuscular Hemoglobin</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.meanCorpuscularHemoglobin}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>27 - 33 <Typography variant='body2' sx={{textTransform: 'none'}}>pg</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.meanCorpuscularHemoglobin, 27, 33)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Mean Corpuscular Hemoglobin Concentration</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.meanCorpuscularHemoglobinConcentration}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>32 - 36 <Typography variant='body2' sx={{textTransform: 'none'}}>g/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.meanCorpuscularHemoglobinConcentration, 32, 36)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Red Cell Distribution Width</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.redCellDistributionWidth}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>11.5 - 14.5 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.redCellDistributionWidth, 11.5, 14.5)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Blood Urea Nitrogen</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.bloodUreaNitrogen}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>6 - 20 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.bloodUreaNitrogen, 6, 20)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Creatinine</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.creatinine}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>0.7 - 1.3 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.creatinine, 0.7, 1.3)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Sodium</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.sodium}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>135 - 145 <Typography variant='body2' sx={{textTransform: 'none'}}>mEq/L</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.sodium, 135, 145)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Potassium</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.potassium}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>3.5 - 5.0 <Typography variant='body2' sx={{textTransform: 'none'}}>mEq/L</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.potassium, 3.5, 5.0)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Chloride</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.chloride}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>96 - 106 <Typography variant='body2' sx={{textTransform: 'none'}}>mEq/L</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.chloride, 96, 106)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Bicarbonate</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.bicarbonate}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>22 - 29 <Typography variant='body2' sx={{textTransform: 'none'}}>mEq/L</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.bicarbonate, 22, 29)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Calcium</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.calcium}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>8.6 - 10.2 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.calcium, 8.6, 10.2)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Magnesium</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.magnesium}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>1.7 - 2.2 <Typography variant='body2' sx={{textTransform: 'none'}}>mg/dL</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.magnesium, 1.7, 2.2)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Neutrophils</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.neutrophils}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>40 - 60 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.neutrophils, 40, 60)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Lymphocytes</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.lymphocytes}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>20 - 40 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.lymphocytes, 20, 40)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Monocytes</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.monocytes}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>2 - 8 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.monocytes, 2, 8)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Eosinophils</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.eosinophils}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>1 - 4 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.eosinophils, 1, 4)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell sx={{fontWeight: '500'}}>Basophils</TableCell>
                      <TableCell align="right">{bloodTestByPatient?.basophils}</TableCell>
                      <TableCell sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '5px'}}>&lt; 1 <Typography variant='body2' sx={{textTransform: 'none'}}>%</Typography></TableCell>
                      <TableCell align="right">{getStatus(bloodTestByPatient?.basophils, 0, 1)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
          </CardContent>
          <CardActions sx={{ marginLeft: '8px' }}>
          <CustomButton icon={ModeEditIcon} color="#000" hoverColor="#f3f3f3" width='180px'>
            Update Test Result
          </CustomButton>
          <CustomButton icon={DeleteIcon} color="#EF4444" hoverColor="#f3f3f3" hoverTextColor="#c93b3b"  width='180px'>
            Delete Test Result
          </CustomButton>
          </CardActions>
        </Card>
      </Box >
    )
}