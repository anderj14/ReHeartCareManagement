-- SQLite
-- Insert data into the Appointments table
INSERT INTO Appointments (AppUserId, Date, Time, Description, AppointmentStatusId, PatientId)
VALUES
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-01', '09:00:00', 'General consultation', 1, 1),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-02', '10:00:00', 'Annual check-up', 2, 1),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-03', '11:00:00', 'Follow-up', 3, 2),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-04', '09:00:00', 'General consultation', 1, 2),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-05', '10:00:00', 'Annual check-up', 2, 3),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-06', '11:00:00', 'Follow-up', 4, 3),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-07', '09:00:00', 'General consultation', 1, 4),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-08', '10:00:00', 'Annual check-up', 2, 4),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-09', '11:00:00', 'Follow-up', 3, 5),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-10', '09:00:00', 'General consultation', 1, 5),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-11', '10:00:00', 'Annual check-up', 2, 6),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-12', '11:00:00', 'Follow-up', 3, 6),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-13', '09:00:00', 'General consultation', 1, 7),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-14', '10:00:00', 'Annual check-up', 2, 7),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-15', '11:00:00', 'Follow-up', 3, 8),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-16', '09:00:00', 'General consultation', 1, 8),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-17', '10:00:00', 'Annual check-up', 2, 9),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-18', '11:00:00', 'Follow-up', 3, 9),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-19', '09:00:00', 'General consultation', 1, 10),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-20', '10:00:00', 'Annual check-up', 2, 10),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-21', '11:00:00', 'Follow-up', 3, 11),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-22', '09:00:00', 'General consultation', 1, 11),
('f25d8a4a-1b30-4532-ab6d-b07fef0324ec', '2023-05-23', '10:00:00', 'Annual check-up', 5, 10);

-- Inserta datos en la tabla AppointmentStatus
INSERT INTO AppointmentStatuses (AppointmentStatusName)
VALUES
('Scheduled'),
('Completed'),
('Cancelled'),
('Rescheduled'),
('No Show');

INSERT INTO Patients (AppUserId, PatientName, CarnetIdentification, DOB, Gender, Address, Phone, Email, SocialSecurity)
VALUES
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Ana Martinez', 'CI001', '1985-03-12', 'F', '123 Calle Falsa', 1234567890, 'ana.martinez@example.com', 'SS001'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Luis Rodriguez', 'CI002', '1990-06-24', 'M', '456 Avenida Siempreviva', 2345678901, 'luis.rodriguez@example.com', 'SS002'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Carmen Garcia', 'CI003', '1978-11-05', 'F', '789 Boulevard de la Rosa', 3456789012, 'carmen.garcia@example.com', 'SS003'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Mario Lopez', 'CI004', '1982-02-17', 'M', '321 Plaza Mayor', 4567890123, 'mario.lopez@example.com', 'SS004'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Sofia Hernandez', 'CI005', '1995-07-19', 'F', '654 Calle Nueva', 5678901234, 'sofia.hernandez@example.com', 'SS005'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Juan Torres', 'CI006', '1988-12-22', 'M', '987 Avenida del Sol', 6789012345, 'juan.torres@example.com', 'SS006'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Elena Ramirez', 'CI007', '1993-09-15', 'F', '111 Calle del Mar', 7890123456, 'elena.ramirez@example.com', 'SS007'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Carlos Fernandez', 'CI008', '1980-05-09', 'M', '222 Camino Verde', 8901234567, 'carlos.fernandez@example.com', 'SS008'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Lucia Gomez', 'CI009', '1992-04-03', 'F', '333 Calle Real', 9012345678, 'lucia.gomez@example.com', 'SS009'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Pedro Sanchez', 'CI010', '1986-08-28', 'M', '444 Paseo de las Flores', 9123456789, 'pedro.sanchez@example.com', 'SS010'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Marta Diaz', 'CI011', '1991-10-10', 'F', '555 Callejón de los Sueños', 1234567800, 'marta.diaz@example.com', 'SS011'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Andres Vega', 'CI012', '1984-01-30', 'M', '666 Plaza de la Libertad', 2345678900, 'andres.vega@example.com', 'SS012'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Laura Jimenez', 'CI013', '1989-11-21', 'F', '777 Calle del Alba', 3456789000, 'laura.jimenez@example.com', 'SS013'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Felipe Mendez', 'CI014', '1996-02-14', 'M', '888 Avenida Central', 4567890000, 'felipe.mendez@example.com', 'SS014'),
('2833201a-5428-493e-8fa9-e38fcbbde887', 'Gloria Rios', 'CI015', '1977-03-27', 'F', '999 Boulevard del Norte', 5678900000, 'gloria.rios@example.com', 'SS015');

-- Insert data into the BloodTests table
INSERT INTO BloodTests (Date, Hemoglobin, Hematocrit, WhiteBloodCell, Platelets, Glucose, CholesterolHDL, CholesterolLDL, Triglycerides, PatientId)
VALUES
('2023-08-20', '14.5 g/dL', '42%', '7500/mm3', '250000/mm3', '95 mg/dL', '50 mg/dL', '120 mg/dL', '150 mg/dL', 1),
('2023-08-10', '13.2', '40.0', '8000', '260000', '110', '45', '160', '180', 2),
('2023-08-22', '12.0 g/dL', '38%', '8200/mm3', '220000/mm3', '110 mg/dL', '55 mg/dL', '130 mg/dL', '170 mg/dL', 2),
('2023-08-22', '14.2 g/dL', '40%', '7200/mm3', '248000/mm3', '92 mg/dL', '52 mg/dL', '118 mg/dL', '147 mg/dL', 6),
('2023-08-27', '14.1 g/dL', '40%', '7150/mm3', '248000/mm3', '91 mg/dL', '49 mg/dL', '116 mg/dL', '142 mg/dL', 3),
('2023-08-27', '14.1 g/dL', '40%', '7150/mm3', '248000/mm3', '91 mg/dL', '49 mg/dL', '116 mg/dL', '142 mg/dL', 4),
('2023-08-23', '13.7 g/dL', '38%', '7000/mm3', '240000/mm3', '88 mg/dL', '46 mg/dL', '112 mg/dL', '135 mg/dL', 5),
('2023-08-26', '14.8 g/dL', '41%', '7300/mm3', '255000/mm3', '96 mg/dL', '55 mg/dL', '123 mg/dL', '155 mg/dL', 6);

-- Insert data into the Electrocardiograms table
INSERT INTO Electrocardiograms (Date, HeartRhythm, IntervalsSegments, CharacteristicWaves, HeartRate, Abnormalities, Artifacts, PatientId)
VALUES
('2023-08-15', 'Normal', 'Normal intervals and segments', 'Regular characteristic waves', '75 bpm', 'No significant abnormalities', 'Minimal artifacts', 3),
('2023-08-10', 'Atrial Fibrillation', 'Irregular intervals and segments', 'Absent P waves', '110 bpm', 'Signs of arrhythmia', 'Moderate artifacts', 1),
('2023-08-20', 'Normal sinus rhythm', 'Within normal limits', 'No significant abnormalities', '70 bpm', 'None', 'Minimal', 1),
('2023-08-21', 'Atrial fibrillation', 'Prolonged PR interval', 'ST-segment depression', '110 bpm', 'T-wave inversion', 'Moderate', 2),
('2023-09-05', 'Normal', 'Normal intervals and segments', 'Regular characteristic waves', '72 bpm', 'No significant abnormalities', 'Minimal artifacts', 4),
('2023-09-10', 'Normal', 'Normal intervals and segments', 'Regular characteristic waves', '70 bpm', 'No significant abnormalities', 'Minimal artifacts', 5),
('2023-09-15', 'Normal', 'Normal intervals and segments', 'Regular characteristic waves', '68 bpm', 'No significant abnormalities', 'Minimal artifacts', 6),
('2023-09-20', 'Normal', 'Normal intervals and segments', 'Regular characteristic waves', '73 bpm', 'No significant abnormalities', 'Minimal artifacts', 5);

-- Insert data into the Echocardiograms table
INSERT INTO Echocardiograms (Date, CardiacDimensions, EjectionFraction, ValveFunction, VelocitiesBloodFlows, MovementCardiacWalls, PulmonaryArterialPressure, BloodFlow, PatientId)
VALUES
('2023-08-25', 'Normal', '60%', 'Normal', 'Within normal limits', 'Good', '25 mmHg', 'Normal', 1),
('2023-08-27', 'Mildly Enlarged', '50%', 'Mitral Valve Regurgitation', 'Reduced', 'Hypokinesis', '30 mmHg', 'Stenosis', 2),
('2023-08-21', 'Mild dilation', '45%', 'Mild regurgitation', 'Reduced', 'Hypokinesia', '30 mmHg', 'Impaired', 2),
('2023-09-05', 'Mild hypertrophy', '55%', 'Mild regurgitation', 'Slightly elevated', 'Reduced', '30 mmHg', 'Reduced', 3),
('2023-09-10', 'Normal', '60%', 'Normal', 'Within normal limits', 'Good', '25 mmHg', 'Normal', 4),
('2023-09-15', 'Moderate hypertrophy', '50%', 'Mild regurgitation', 'Slightly elevated', 'Reduced', '32 mmHg', 'Reduced', 5),
('2023-09-20', 'Normal', '65%', 'Normal', 'Within normal limits', 'Good', '28 mmHg', 'Normal', 6);

-- Insert data into the CardiacCatheterizationStudies table
INSERT INTO CardiacCatheterizationStudies (Date, Time, NumLocationMainCoronary, BlockageEachCoronaryArtery, DescriptionAbnormality, BloodPressureAorta, ChambersLeftAtrium, ChambersLeftVentricle, ChambersRightAtrium, ChambersRightVentricle, BloodFlowCoronaryArteries, VelocityBloodFlow, LeftVentricularEjectionFraction, BloodPressurePulmonaryArteries, ValvularInsufficiencyAortic, ValvularInsufficiencyMitral, ValvularInsufficiencyPulmonary, ValvularInsufficiencyTricuspid, PressureGradientValves, StructuralAbnormalities, FunctionsCardiacChambers, DescriptionComplication, Conclusion, PatientId)
VALUES
('2023-08-08', '09:00:00', 'Single vessel disease', '50% in LAD', 'Mild atherosclerosis', '120/80 mmHg', 'Normal size', 'Normal size and function', 'Normal size', 'Normal size and function', 'Satisfactory', 'Normal', '60%', '25/15 mmHg', 'Mild', 'None', 'None', 'None', 'None', 'None', 'Normal', 'None', 'Coronary artery disease detected', 1),
('2023-08-12', '11:30:00', 'Multivessel disease', '70% in LAD, 50% in RCA', 'Moderate atherosclerosis', '130/85 mmHg', 'Mild enlargement', 'Mild hypokinesis', 'Normal size', 'Mild hypokinesis', 'Reduced', 'Decreased', '50%', '30/20 mmHg', 'Mild to moderate', 'Mild', 'None', 'Mild', 'Increased', 'Mild mitral valve prolapse', 'Reduced', 'None', 'Significant coronary artery disease and valve issues detected', 2),
('2023-08-20', '09:30:00', 'Single lesion', '50%, 40%, 70%', 'Mild stenosis', '120/80', 'Normal', 'Normal', 'Normal', 'Mild dilation', 'Adequate', 'Normal', '60%', '25/12', 'None', 'Mild', 'None', 'Mild', 'Normal', 'None', 'Normal', 'No complications', 'Normal study', 1),
('2023-08-21', '10:15:00', 'Multivessel disease', '80%, 90%, 75%', 'Moderate stenosis', '130/85', 'Mild dilation', 'Mild hypertrophy', 'Normal', 'Normal', 'Impaired', 'Reduced', '45%', '30/15', 'Mild', 'Moderate', 'Mild', 'None', 'Elevated', 'Mild dilation', 'Impaired', 'Ventricular fibrillation during procedure', 'Significant disease', 3),
('2023-08-10', '14:15:00', 'Multi-vessel disease', '70% in LAD, 50% in RCA', 'Moderate atherosclerosis', '130/85 mmHg', 'Slightly enlarged', 'Mild hypertrophy', 'Normal size', 'Normal size and function', 'Moderately compromised', 'Reduced', '45%', '30/20 mmHg', 'Moderate', 'Mild', 'None', 'None', 'Mild', 'None', 'Reduced left ventricular function', 'None', 'Severe coronary artery disease detected', 4),
('2023-08-12', '10:30:00', 'No significant blockages', 'None', 'No atherosclerosis detected', '125/75 mmHg', 'Normal size', 'Normal size and function', 'Normal size', 'Normal size and function', 'Normal', 'Normal', '65%', '25/15 mmHg', 'None', 'None', 'None', 'None', 'None', 'None', 'Normal', 'None', 'No significant cardiac abnormalities detected', 5),
('2023-08-15', '16:45:00', 'Single vessel disease', '60% in RCA', 'Moderate atherosclerosis', '130/80 mmHg', 'Normal size', 'Mild hypertrophy', 'Normal size', 'Normal size and function', 'Moderately compromised', 'Reduced', '50%', '28/18 mmHg', 'Moderate', 'Mild', 'None', 'None', 'Moderate', 'None', 'Reduced left ventricular function', 'None', 'Moderate coronary artery disease detected', 6),
('2023-08-18', '11:15:00', 'Multi-vessel disease', '70% in LAD, 60% in RCA', 'Moderate atherosclerosis', '140/90 mmHg', 'Slightly enlarged', 'Mild hypertrophy', 'Normal size', 'Normal size and function', 'Moderately compromised', 'Reduced', '48%', '32/20 mmHg', 'Moderate', 'Mild', 'None', 'None', 'Moderate', 'None', 'Reduced left ventricular function', 'None', 'Moderate coronary artery disease detected', 6);

INSERT INTO HolterStudies (Date, Time, StudyDuration, AverageHeartRate, MaximumHeartRate, TypeHeartRhythm, ArrhythmiaEpisodes, PhysicalActivity, PatientSymptoms, Conclusion, PatientId) VALUES
('2023-08-15', '08:00:00', '24 hours', '80 bpm', '110 bpm', 'Normal sinus rhythm', 'None', 'Moderate', 'Occasional palpitations', 'Normal Holter monitoring', 1),
('2023-08-20', '10:30:00', '48 hours', '75 bpm', '105 bpm', 'Sinus tachycardia', 'Atrial fibrillation', 'Light', 'Fatigue', 'Atrial fibrillation detected', 3),
('2023-08-20', '10:30:00', '48 hours', '75 bpm', '105 bpm', 'Sinus tachycardia', 'Atrial fibrillation', 'Light', 'Fatigue', 'Atrial fibrillation detected', 1),
('2023-08-21', '10:30:00', '24 hours', '80 bpm', '110 bpm', 'Normal sinus rhythm', 'None', 'Moderate', 'Occasional palpitations', 'Normal Holter monitoring', 2),
('2023-08-21', '10:00:00', '24 hours', '78 bpm', '105 bpm', 'Normal sinus rhythm', 'None', 'Light', 'None', 'Normal Holter monitoring', 5),
('2023-08-24', '09:15:00', '24 hours', '82 bpm', '112 bpm', 'Normal sinus rhythm', 'None', 'Moderate', 'None', 'Normal Holter monitoring', 6),
('2023-08-28', '08:30:00', '24 hours', '87 bpm', '118 bpm', 'Normal sinus rhythm', 'None', 'Moderate', 'None', 'Normal Holter monitoring', 4);

INSERT INTO PhysicalExaminations (Date, Time, Duration, MaxHeartRate, PeakPressure, ExerciseInducedSymptoms, AbnormalEcgFindings, ImageEco, ImageStress, Conclusion, PatientId) VALUES
('2023-08-30', '11:00:00', '20 minutes', '140 bpm', '130/80 mmHg', 'None', 'ST-segment depression', 'Normal', 'Negative for ischemia', 'Normal exercise tolerance', 1),
('2023-09-02', '09:30:00', '18 minutes', '155 bpm', '135/85 mmHg', 'Shortness of breath', 'T-wave inversion', 'Mild Hypertrophy', 'Positive for ischemia', 'Inducible myocardial ischemia', 2),
('2023-08-20', '09:30:00', '18 minutes', '72 bpm', '135/85 mmHg', 'Shortness of breath', 'T-wave inversion', 'Mild Hypertrophy', 'Positive for ischemia', 'Inducible myocardial ischemia', 1),
('2023-09-05', '10:30:00', '15 minutes', '150 bpm', '120/75 mmHg', 'None', 'Normal', 'Normal', 'Negative for ischemia', 'Normal exercise tolerance', 4),
('2023-09-10', '11:15:00', '18 minutes', '155 bpm', '125/80 mmHg', 'None', 'Normal', 'Normal', 'Negative for ischemia', 'Normal exercise tolerance', 5),
('2023-09-15', '09:45:00', '17 minutes', '148 bpm', '122/78 mmHg', 'None', 'Normal', 'Normal', 'Negative for ischemia', 'Normal exercise tolerance', 6),
('2023-09-20', '12:00:00', '14 minutes', '152 bpm', '118/76 mmHg', 'None', 'Normal', 'Normal', 'Negative for ischemia', 'Normal exercise tolerance', 3);

INSERT INTO DiseaseHistories (StartDate, Description, Treatment, PatientId) VALUES
('2022-05-10', 'Hypertension', 'Lifestyle modifications', 1),
('2021-07-15', 'Type 2 Diabetes', 'Medication, diet, and exercise', 2),
('2020-03-15', 'Chronic obstructive pulmonary disease', 'Bronchodilators and inhalers', 1),
('2022-06-15', 'Type 2 Diabetes', 'Insulin therapy', 3),
('2022-08-05', 'High Cholesterol', 'Statins medication', 6),
('2022-07-20', 'Asthma', 'Bronchodilator inhaler', 5);

INSERT INTO MedicalHistories (Date, PreviousHeartDisease, HighBloodPressure, Diabetes, Hyperlipidemia, Obesity, Smoking, CardiacProceduresSurgeries, SystemicDiseases, Medications, FamilyDiseases, PatientId) VALUES
('2023-07-10', 'None', 'Yes', 'No', 'Yes', 'No', 'Former smoker', 'None', 'None', 'Lisinopril, Atorvastatin', 'Hypertension', 1),
('2023-08-05', 'Myocardial Infarction', 'No', 'Yes', 'Yes', 'Yes', 'Current smoker', 'Angioplasty', 'None', 'Metformin, Atorvastatin', 'Diabetes', 3),
('2019-07-05', 'Myocardial infarction', 'Yes', 'Yes', 'Yes', 'Yes', 'No', 'Coronary angioplasty', 'Hypothyroidism', 'Insulin, Statins', 'Hypertension', 2),
('2023-07-15', 'None', 'No', 'Yes', 'Yes', 'Yes', 'Non-smoker', 'None', 'None', 'Metformin, Simvastatin', 'Diabetes', 4),
('2023-07-20', 'None', 'No', 'No', 'No', 'Yes', 'Non-smoker', 'None', 'None', 'None', 'Obesity', 5),
('2023-07-25', 'None', 'No', 'Yes', 'No', 'No', 'Non-smoker', 'None', 'None', 'Metformin', 'Diabetes', 6);

INSERT INTO Diagnostics (Id, Date, ConditionName, Description, ClassificationCondition, Severity, RiskAssessment, Conclusions, PatientId) VALUES
(1, '2023-08-10', 'Hypertension', 'Elevated blood pressure readings', 'Primary', 'Moderate', 'Increased risk of heart disease', 'Lifestyle modifications recommended', 1),
(2, '2023-08-18', 'Type 2 Diabetes', 'Elevated blood glucose levels', 'Secondary', 'Mild', 'Increased risk of complications', 'Medication and lifestyle changes recommended', 4),
(3, '2023-08-20', 'Hypertension', 'High blood pressure readings consistently', 'Chronic', 'Moderate', 'Increased risk of heart disease', 'Recommend lifestyle changes and medication', 3),
(4, '2023-08-21', 'Diabetes', 'Elevated blood sugar levels', 'Chronic', 'Severe', 'Increased risk of cardiovascular complications', 'Start insulin therapy and monitor regularly', 2),
(5, '2023-08-18', 'Asthma', 'Chronic respiratory condition', 'Mild persistent', 'Mild', 'Increased risk of respiratory infections', 'Prescription for inhaler provided', 2),
(6, '2023-08-20', 'High Cholesterol', 'Elevated cholesterol levels', 'Hypercholesterolemia', 'Moderate', 'Increased risk of heart disease', 'Prescription for cholesterol-lowering medication given', 5),
(7, '2023-08-20', 'High Cholesterol', 'Elevated cholesterol levels', 'Hypercholesterolemia', 'Moderate', 'Increased risk of heart disease', 'Prescription for cholesterol-lowering medication given', 6);

INSERT INTO Treatments (Id, Date, Medication, Dosage, Instructions, OtherTreatments, SideEffects, TreatmentMonitoring, PatientId) VALUES
(1, '2023-08-05', 'Lisinopril', '10 mg once daily', 'Take with food', 'Lifestyle changes', 'Dry cough', 'Blood pressure checks', 3),
(2, '2023-08-25', 'Metformin', '1000 mg twice daily', 'Take with meals', 'Regular exercise', 'Nausea', 'Blood glucose levels', 2),
(3, '2023-08-20', 'Lisinopril', '10 mg daily', 'Take with food', 'Diet and exercise', 'Cough', 'Blood pressure checks', 1),
(4, '2022-06-10', 'Aspirin', '81 mg once daily', 'Take in the morning', 'Dietary changes', 'Upset stomach', 'Regular check-ups', 4),
(5, '2022-07-05', 'Metformin', '1000 mg twice daily', 'Take with meals', 'Exercise routine', 'Nausea', 'Blood sugar checks', 6),
(6, '2022-07-20', 'Atorvastatin', '20 mg once daily', 'Take before bedtime', 'Dietary changes', 'Muscle pain', 'Cholesterol tests', 5);
