import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Modal } from '@mui/material';
import Subtitle from '../../../../app/components/Subtitle';
import { timeDisplay } from '../../../../app/components/timeDisplay';
import formatDateTime from '../../../../app/components/formatDateTime';
import { ClinicalEvaluation } from '../../../../app/Models/clinicalEvaluation';
import CustomButton from '../../../../app/components/CustomButton';
import { LuPlus } from 'react-icons/lu';
import ClinicalEvaluationForm from './ClinicalEvaluationForm';
import ClinicalEvaluationDetails from './ClinicalEvaluationsDetails';

interface HolterStudyByPatient {
    clinicalEvaluations: ClinicalEvaluation[];
}

interface ClinicalEvaluationsProps {
    holterStudyByPatient: HolterStudyByPatient;
    holterStudyId?: number;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '4px',
};

const ClinicalEvaluations: React.FC<ClinicalEvaluationsProps> = ({ holterStudyByPatient, holterStudyId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvaluation, setSelectedEvaluation] = useState<ClinicalEvaluation | undefined>(undefined);
    const [openForm, setOpenForm] = useState(false);

    const handleOpenModal = (evaluation: ClinicalEvaluation) => {
        setSelectedEvaluation(evaluation);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEvaluation(undefined);
        setModalOpen(false);
    };

    const toggleFormModal = (newOpen: boolean) => () => {
        setOpenForm(newOpen);
    };

    return (
        <CardContent sx={{ padding: '25px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Subtitle subtitle="Clinical Evaluations" />
                <CustomButton
                    open={openForm}
                    onClick={toggleFormModal(true)}
                    icon={LuPlus}
                    color="#fff"
                    width="100"
                    borderColor="transparent"
                >
                    Add Clinical Evaluation
                </CustomButton>
            </Box>
            {holterStudyByPatient.clinicalEvaluations.length > 0 ? (
                holterStudyByPatient.clinicalEvaluations.map((evaluation, index) => (
                    <Card
                        className="card"
                        variant="outlined"
                        sx={{ marginTop: '20px', cursor: 'pointer' }}
                        key={evaluation.id}
                        onClick={() => handleOpenModal(evaluation)}
                    >
                        <CardContent sx={{ padding: '20px' }}>
                            <Typography sx={{ fontWeight: '800', fontSize: '20px' }}>
                                Evaluation {index + 1}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDateTime(evaluation.evaluationDateTime)} {timeDisplay(evaluation.evaluationDateTime)}
                            </Typography>
                            <Box sx={{ marginTop: '25px' }}>
                                <Typography sx={{ fontWeight: '600' }}>Findings</Typography>
                                <Typography variant="body1">{evaluation.findings}</Typography>
                            </Box>
                            <Box sx={{ marginTop: '25px' }}>
                                <Typography sx={{ fontWeight: '600' }}>Recommendations</Typography>
                                <Typography variant="body1">{evaluation.recommendations}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No clinical evaluations available
                </Typography>
            )}
            {modalOpen && selectedEvaluation && (
                <ClinicalEvaluationDetails
                    open={modalOpen}
                    onClose={handleCloseModal}
                    evaluation={selectedEvaluation}
                />
            )}
            <Modal
                open={openForm}
                onClose={toggleFormModal(false)}
            >
                <Box sx={modalStyle}>
                    <ClinicalEvaluationForm
                        cancelEdit={toggleFormModal(false)}
                        evaluation={selectedEvaluation}
                        holterStudyId={holterStudyId}
                    />
                </Box>
            </Modal>
        </CardContent>
    );
};

export default ClinicalEvaluations;
