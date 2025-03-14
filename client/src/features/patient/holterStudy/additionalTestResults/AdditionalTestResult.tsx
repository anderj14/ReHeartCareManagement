import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Modal } from '@mui/material';
import Subtitle from '../../../../app/components/Subtitle';
import { timeDisplay } from '../../../../app/components/timeDisplay';
import formatDateTime from '../../../../app/components/formatDateTime';
import { AdditionalTestResult } from '../../../../app/Models/additionalTestResult';
import AdditionalTestResultDetails from './AdditionalTestResultDetails';
import CustomButton from '../../../../app/components/CustomButton';
import { LuPlus } from 'react-icons/lu';
import AdditionalTestResultDetailsForm from './AdditionalTestResultDetailsForm';

interface HolterStudyByPatient {
    additionalTestResults: AdditionalTestResult[];
}

interface AdditionalTestResultsProps {
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
  borderRadius: '4px'
};

const AdditionalTestResults: React.FC<AdditionalTestResultsProps> = ({ holterStudyByPatient, holterStudyId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState<AdditionalTestResult | undefined>(undefined);
    const [openForm, setOpenForm] = useState(false);
    
    const handleOpenModal = (test: AdditionalTestResult) => {
      setSelectedTest(test);
      setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTest(undefined);
        setModalOpen(false);
    };

    const toggleFormModal = (newOpen: boolean) => () => {
        setOpenForm(newOpen);
    };

    return (
        <CardContent sx={{ padding: '25px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Subtitle subtitle={"Additional Test Results"} />
                <CustomButton
                    open={openForm}
                    onClick={toggleFormModal(true)}
                    icon={LuPlus}
                    color="#fff"
                    width="100"
                    borderColor="transparent"
                >
                    Add Additional test
                </CustomButton>
            </Box>
            {holterStudyByPatient.additionalTestResults.length > 0 ? (
                holterStudyByPatient.additionalTestResults.map((a) => (
                    <Card
                        className="card"
                        variant="outlined"
                        sx={{ marginTop: '20px', cursor: 'pointer' }}
                        key={a.id}
                        onClick={() => handleOpenModal(a)}
                    >
                        <CardContent sx={{ padding: '20px' }}>
                            <Typography sx={{ fontWeight: '800', fontSize: '20px' }}>{a.testName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDateTime(a.testDateTime)} {timeDisplay(a.testDateTime)}
                            </Typography>
                            <Box sx={{ marginTop: '25px' }}>
                                <Typography sx={{ fontWeight: '600' }}>Results</Typography>
                                <Typography variant="body1">{a.results}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No additional test results available
                </Typography>
            )}
            {modalOpen && selectedTest && (
                <AdditionalTestResultDetails
                  open={modalOpen}
                  onClose={handleCloseModal}
                  test={selectedTest}
                />
            )}
            <Modal
              open={openForm}
              onClose={toggleFormModal(false)}
            >
              <Box sx={modalStyle}>
                <AdditionalTestResultDetailsForm
                  cancelEdit={toggleFormModal(false)}
                  test={selectedTest}
                  holterStudyId={holterStudyId}
                />
              </Box>
            </Modal>
        </CardContent>
    );
};

export default AdditionalTestResults;