import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import Breadcrumb from '../../app/components/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchCardiologySurgeryAsync, surgerySelectors } from './surgerySlice';
import NotFound from '../../app/errors/NotFound';

export default function CardiologySurgeryDetails() {
    const { id } = useParams<{ id: any }>();
    const [loading, setLoading] = useState(true);
    const cardiologySurgery = useAppSelector(state => surgerySelectors.selectById(state, id));
    const { status: cardiologySurgeryStatus } = useAppSelector(state => state.cardiologySurgery);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCardiologySurgery = async () => {
            if (!cardiologySurgery) dispatch(fetchCardiologySurgeryAsync(id));
        }

        fetchCardiologySurgery();
    }, [id, dispatch, cardiologySurgery]);

    if (cardiologySurgeryStatus.includes('pending')) return <h3>Loading...</h3>;

    if (!cardiologySurgery) return <NotFound />;

    return (
        <div className="container">
            <Breadcrumb page='surgery / surgery name' />
            <Card>
                <CardContent className="surgeryDetails">
                    <Typography variant="h5" sx={{ fontWeight: '500' }}>{cardiologySurgery?.patient}</Typography>
                    <Box className="contents">
                        <div className="contentInfo">
                            <Box className="surgeryInfo">
                                <p>Surgery Name:</p>
                                <p>Date:</p>
                                <p>Time:</p>
                                <p>Procedure Description:</p>
                                <p>Notes:</p>
                            </Box>
                            <Box className="surgeryInfoData">
                                <p>{cardiologySurgery.surgeryName}</p>
                                <p>{cardiologySurgery.date ? format(new Date(cardiologySurgery.date), 'dd/MM/yyyy') : ''}</p>
                                <p>{cardiologySurgery.time}</p>
                                <p>{cardiologySurgery.procedureDescription}</p>
                                <p>{cardiologySurgery.notes}</p>
                            </Box>
                        </div>
                        <div className="contentInfo" >
                            <Box className="surgeryInfo">
                                <p>Is Emergency:</p>
                                <p>Is Elective:</p>
                                <p>Is Successfull:</p>
                                <p>Is Minimally Invasive:</p>
                                <p>Duration:</p>
                            </Box>
                            <Box className="surgeryInfoData">
                                <p>{cardiologySurgery.isEmergency}</p>
                                <p>{cardiologySurgery.isElective}</p>
                                <p>{cardiologySurgery.isSuccessful}</p>
                                <p>{cardiologySurgery.isMinimallyInvasive}</p>
                                <p>{cardiologySurgery.duration} Minutes</p>
                            </Box>
                        </div>
                        <div className="contentInfo">
                            <Box className="surgeryInfo">
                                <p>Operation Room:</p>
                                <p>Pre Op Diagnosis:</p>
                                <p>Cardiac Condition :</p>
                                <p>Post Op Diagnosis:</p>
                            </Box>
                            <Box className="surgeryInfoData">
                                <p>{cardiologySurgery.operationRoom}</p>
                                <p>{cardiologySurgery.preOpDiagnosis}</p>
                                <p>{cardiologySurgery.cardiacCondition}</p>
                                <p>{cardiologySurgery.postOpDiagnosis}</p>
                            </Box>
                        </div>
                    </Box>

                </CardContent>
            </Card>
        </div>
    )
}
