INSERT INTO PatientStatuses (PatientStatusName)
VALUES
('Active'),
('Discharged'),
('Under Observation'),
('Critical'),
('Recovered'),
('Deceased'),
('In Surgery'),
('Awaiting Test Results'),
('Transferred'),
('On Hold');

INSERT INTO Patients (AppUserId, PatientName, CarnetIdentification, DOB, Gender, Address, Phone, Email, SocialSecurity, PolicyNumber, Fax, ReferringDoctor, AssignedDoctor, FamilyDoctor, EmergencyContactName, EmergencyContactNumber, EmergencyContactRelation, MaritalStatus, Occupation, StatusId) VALUES
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Alice Smith', '123456', '1985-05-15', 'Female', '123 Main St', 1234567890, 'alice.smith@example.com', '987-65-4320', 'POL123', '123-456-7890', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Bob Smith', '0987654321', 'Husband', 'Married', 'Engineer', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Bob Johnson', '654321', '1978-12-22', 'Male', '456 Elm St', 2345678901, 'bob.johnson@example.com', '987-65-4321', 'POL456', '234-567-8901', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Sara Johnson', '1234567890', 'Wife', 'Married', 'Teacher', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Charlie Brown', '789012', '1990-02-28', 'Male', '789 Oak St', 3456789012, 'charlie.brown@example.com', '987-65-4322', 'POL789', '345-678-9012', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Alice Brown', '2345678901', 'Sister', 'Single', 'Artist', 1),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Diana Prince', '345678', '1980-08-17', 'Female', '321 Maple St', 4567890123, 'diana.prince@example.com', '987-65-4323', 'POL012', '456-789-0123', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Steve Trevor', '3456789012', 'Partner', 'In a Relationship', 'Pilot', 2),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Edward Elric', '456789', '1995-06-13', 'Male', '654 Pine St', 5678901234, 'edward.elric@example.com', '987-65-4324', 'POL345', '567-890-1234', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Winry Rockbell', '4567890123', 'Fiancée', 'Engaged', 'Alchemist', 3),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Fiona Gallagher', '567890', '1982-10-31', 'Female', '987 Birch St', 6789012345, 'fiona.gallagher@example.com', '987-65-4325', 'POL678', '678-901-2345', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Lip Gallagher', '5678901234', 'Brother', 'Single', 'Waitress', 1),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'George Costanza', '678901', '1970-09-17', 'Male', '159 Cedar St', 7890123456, 'george.costanza@example.com', '987-65-4326', 'POL901', '789-012-3456', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Susan Ross', '6789012345', 'Girlfriend', 'Engaged', 'Telemarketer', 2),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Hannah Baker', '789012', '1997-04-15', 'Female', '753 Spruce St', 8901234567, 'hannah.baker@example.com', '987-65-4327', 'POL234', '890-123-4567', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Clay Jensen', '7890123456', 'Boyfriend', 'Single', 'Student', 3),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Ian Gallagher', '890123', '1996-03-28', 'Male', '147 Fir St', 9012345678, 'ian.gallagher@example.com', '987-65-4328', 'POL567', '901-234-5678', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Mickey Milkovich', '8901234567', 'Partner', 'In a Relationship', 'Bartender', 2),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Jenna Marbles', '901234', '1988-11-15', 'Female', '258 Willow St', 1234567891, 'jenna.marbles@example.com', '987-65-4329', 'POL890', '123-456-7891', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Julien Solomita', '9012345678', 'Fiancé', 'Engaged', 'YouTuber', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Kylie Jenner', '234567', '1997-08-10', 'Female', '963 Oak St', 2345678912, 'kylie.jenner@example.com', '987-65-4330', 'POL123', '234-567-8912', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Travis Scott', '2345678913', 'Boyfriend', 'In a Relationship', 'Entrepreneur', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Leonardo DiCaprio', '345678', '1974-11-11', 'Male', '357 Maple St', 3456789123, 'leonardo.dicaprio@example.com', '987-65-4331', 'POL456', '345-678-9123', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Gisele Bündchen', '3456789124', 'Ex-Wife', 'Married', 'Actor', 3),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Monica Geller', '456789', '1970-04-22', 'Female', '456 Elm St', 4567891234, 'monica.geller@example.com', '987-65-4332', 'POL789', '456-789-1234', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Chandler Bing', '4567891235', 'Husband', 'Married', 'Chef', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Nina Williams', '567890', '1985-03-16', 'Female', '579 Pine St', 5678902345, 'nina.williams@example.com', '987-65-4333', 'POL012', '579-890-2345', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Kazumi', '5678902346', 'Sister', 'Single', 'Martial Artist', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Oliver Queen', '678901', '1981-05-21', 'Male', '135 Cherry St', 6789013456, 'oliver.queen@example.com', '987-65-4334', 'POL345', '135-678-9012', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Felicity Smoak', '6789013457', 'Fiancée', 'Engaged', 'Businessman', 3),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Pam Beesly', '789012', '1984-01-25', 'Female', '246 Birch St', 7890124567, 'pam.beesly@example.com', '987-65-4335', 'POL678', '246-789-0123', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Jim Halpert', '7890124568', 'Husband', 'Married', 'Receptionist', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Quinn Fabray', '890123', '1994-07-15', 'Female', '369 Cedar St', 8901235678, 'quinn.fabray@example.com', '987-65-4336', 'POL901', '369-890-1234', 'Dr. Jane Doe', 'Dr. Jane Doe', 'Dr. Emily White', 'Finn Hudson', '8901235679', 'Boyfriend', 'In a Relationship', 'Student', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Ryan Gosling', '901234', '1980-11-12', 'Male', '852 Oak St', 9012346789, 'ryan.gosling@example.com', '987-65-4337', 'POL234', '852-901-2345', 'Dr. John Doe', 'Dr. John Doe', 'Dr. Emily White', 'Eva Mendes', '9012346780', 'Partner', 'In a Relationship', 'Actor', 3);

INSERT INTO AppointmentStatuses (AppointmentStatusName) VALUES
('Scheduled'),
('Completed'),
('Cancelled'),
('No Show'),
('Rescheduled');

INSERT INTO AppointmentTypes (Name, Description) VALUES
('Routine Checkup', 'A standard appointment for a general health assessment.'),
('Follow-Up Visit', 'An appointment to monitor the progress of a treatment or condition.'),
('Consultation', 'An appointment for discussing specific health concerns or treatment options.'),
('Emergency Appointment', 'An urgent visit required for immediate medical attention.'),
('Preoperative Assessment', 'A thorough evaluation before a scheduled surgery.'),
('Postoperative Follow-Up', 'An appointment to check recovery after a surgical procedure.'),
('Annual Physical Exam', 'A yearly comprehensive evaluation of health status.'),
('Specialist Referral', 'An appointment made to see a specialist for specific issues.'),
('Vaccination', 'An appointment for receiving immunizations.'),
('Lab Test', 'A scheduled visit for various laboratory tests.');


INSERT INTO Appointments (AppUserId, StartDate, EndDate, Time, Description, Location, AppointmentStatusId, AppointmentTypeId, PatientId) VALUES
('73ef92c8-6811-4953-83c1-e32379839b2e', '2024-10-01 09:00:00', '2024-10-01 09:30:00', '09:00', 'Routine checkup for hypertension.', 'Clinic A', 1, 1, 1),
('73ef92c8-6811-4953-83c1-e32379839b2e', '2024-10-03 10:00:00', '2024-10-03 10:30:00', '10:00', 'Follow-up visit for medication review.', 'Clinic A', 2, 2, 4),
('73ef92c8-6811-4953-83c1-e32379839b2e', '2024-10-05 11:00:00', '2024-10-05 11:30:00', '11:00', 'Consultation regarding chest pain.', 'Clinic A', 1, 3, 7),
('73ef92c8-6811-4953-83c1-e32379839b2e', '2024-10-07 12:00:00', '2024-10-07 12:30:00', '12:00', 'Preoperative assessment for surgery.', 'Hospital A', 1, 4, 10),
('73ef92c8-6811-4953-83c1-e32379839b2e', '2024-10-09 14:00:00', '2024-10-09 14:30:00', '14:00', 'Annual physical exam.', 'Clinic A', 1, 5, 13),
('73ef92c8-6811-4953-83c1-e32379839b2e', '2024-10-11 15:00:00', '2024-10-11 15:30:00', '15:00', 'Vaccination appointment.', 'Clinic A', 1, 6, 16),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', '2024-10-02 09:00:00', '2024-10-02 09:30:00', '09:00', 'Follow-up visit for diabetes management.', 'Clinic B', 2, 1, 2),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', '2024-10-04 10:00:00', '2024-10-04 10:30:00', '10:00', 'Consultation for skin rash.', 'Clinic B', 1, 3, 5),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', '2024-10-06 11:00:00', '2024-10-06 11:30:00', '11:00', 'Routine checkup for cholesterol.', 'Clinic B', 1, 1, 8),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', '2024-10-08 12:00:00', '2024-10-08 12:30:00', '12:00', 'Emergency appointment for injury.', 'Hospital B', 3, 4, 11),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', '2024-10-10 14:00:00', '2024-10-10 14:30:00', '14:00', 'Postoperative follow-up.', 'Hospital B', 1, 5, 14),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', '2024-10-12 15:00:00', '2024-10-12 15:30:00', '15:00', 'Consultation for blood test results.', 'Clinic B', 1, 2, 17),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', '2024-10-13 09:00:00', '2024-10-13 09:30:00', '09:00', 'Routine checkup for back pain.', 'Clinic C', 1, 1, 3),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', '2024-10-14 10:00:00', '2024-10-14 10:30:00', '10:00', 'Annual physical exam.', 'Clinic C', 1, 5, 6),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', '2024-10-15 11:00:00', '2024-10-15 11:30:00', '11:00', 'Consultation for asthma.', 'Clinic C', 1, 3, 9),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', '2024-10-16 12:00:00', '2024-10-16 12:30:00', '12:00', 'Follow-up visit for allergy treatment.', 'Clinic C', 2, 2, 12),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', '2024-10-17 14:00:00', '2024-10-17 14:30:00', '14:00', 'Emergency appointment for headache.', 'Hospital C', 3, 4, 15),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', '2024-10-18 15:00:00', '2024-10-18 15:30:00', '15:00', 'Routine checkup for eye exam.', 'Clinic C', 1, 6, 18);

INSERT INTO DiseaseHistories (StartDate, Description, Treatment, Diagnosis, Severity, Notes, IsChronic, DoctorName, PatientId)
VALUES
    ('2022-01-15', 'Hypertension management', 'Lifestyle changes, Medication', 'Hypertension', 'Moderate', 'Patient is responding well to treatment', 1, 'Dr. Smith', 1),
    ('2021-06-20', 'Asthma diagnosis', 'Inhaler prescription', 'Asthma', 'Mild', 'Seasonal allergies triggered asthma', 0, 'Dr. Johnson', 2),
    ('2020-11-05', 'Diabetes check', 'Insulin therapy', 'Type 2 Diabetes', 'Severe', 'Requires regular monitoring', 1, 'Dr. Brown', 3),
    ('2021-09-10', 'Routine checkup', 'No treatment needed', 'Healthy', 'None', 'No known health issues', 0, 'Dr. Green', 4),
    ('2022-03-12', 'Chronic back pain', 'Physical therapy', 'Chronic Pain', 'Severe', 'Patient has ongoing pain management', 1, 'Dr. White', 5),
    ('2021-12-22', 'Migraine diagnosis', 'Pain relief medication', 'Migraine', 'Moderate', 'Frequent migraines reported', 1, 'Dr. Black', 6),
    ('2023-01-18', 'Thyroid imbalance', 'Medication adjustment', 'Hypothyroidism', 'Moderate', 'Regular follow-ups needed', 1, 'Dr. Grey', 7),
    ('2020-07-14', 'Healthy lifestyle review', 'Diet and exercise guidance', 'Healthy', 'None', 'Maintaining good health', 0, 'Dr. Pink', 8),
    ('2022-05-05', 'High cholesterol', 'Cholesterol-lowering medication', 'Hyperlipidemia', 'Moderate', 'Diet adjustments recommended', 1, 'Dr. Red', 9),
    ('2023-03-25', 'Post-surgery recovery', 'Follow-up visits', 'Recovery', 'Mild', 'Surgery was successful', 0, 'Dr. Blue', 10),
    ('2021-04-11', 'Allergy testing', 'Antihistamines prescribed', 'Allergies', 'Mild', 'Seasonal allergies confirmed', 0, 'Dr. Yellow', 11),
    ('2021-08-30', 'Joint pain management', 'Physical therapy', 'Osteoarthritis', 'Moderate', 'Patient shows improvement', 1, 'Dr. Brown', 12),
    ('2022-02-10', 'Cardiovascular risk assessment', 'Lifestyle changes recommended', 'At risk', 'Moderate', 'Monitoring required', 1, 'Dr. Smith', 13),
    ('2020-10-01', 'Routine health check', 'No action needed', 'Healthy', 'None', 'No issues found', 0, 'Dr. Johnson', 14),
    ('2021-05-15', 'Sleep apnea assessment', 'CPAP therapy', 'Sleep Apnea', 'Moderate', 'Patient needs follow-up', 1, 'Dr. Green', 15),
    ('2023-07-08', 'Cholesterol re-evaluation', 'Dietary changes', 'Hyperlipidemia', 'Mild', 'Monitoring cholesterol levels', 0, 'Dr. Red', 16),
    ('2022-09-14', 'Routine physical exam', 'Vitamins suggested', 'Healthy', 'None', 'Patient is in good health', 0, 'Dr. Pink', 17),
    ('2021-11-02', 'Chronic sinusitis', 'Nasal spray prescribed', 'Chronic Sinusitis', 'Severe', 'Regular follow-ups needed', 1, 'Dr. White', 18),
    ('2023-05-30', 'Routine follow-up', 'Continued monitoring', 'Healthy', 'None', 'No health issues', 0, 'Dr. Blue', 19),
    ('2022-12-20', 'General health check', 'No concerns', 'Healthy', 'None', 'Maintaining good health', 0, 'Dr. Black', 20);

INSERT INTO Attachments (FilePath, FileName, DiseaseHistoryId)
VALUES
    ('/files/disease_history/1_report.pdf', '1_report.pdf', 1),
    ('/files/disease_history/2_report.pdf', '2_report.pdf', 2),
    ('/files/disease_history/3_report.pdf', '3_report.pdf', 3),
    ('/files/disease_history/4_report.pdf', '4_report.pdf', 4),
    ('/files/disease_history/5_report.pdf', '5_report.pdf', 5),
    ('/files/disease_history/6_report.pdf', '6_report.pdf', 6),
    ('/files/disease_history/7_report.pdf', '7_report.pdf', 7),
    ('/files/disease_history/8_report.pdf', '8_report.pdf', 8),
    ('/files/disease_history/9_report.pdf', '9_report.pdf', 9),
    ('/files/disease_history/10_report.pdf', '10_report.pdf', 10),
    ('/files/disease_history/11_report.pdf', '11_report.pdf', 11),
    ('/files/disease_history/12_report.pdf', '12_report.pdf', 12),
    ('/files/disease_history/13_report.pdf', '13_report.pdf', 13),
    ('/files/disease_history/14_report.pdf', '14_report.pdf', 14),
    ('/files/disease_history/15_report.pdf', '15_report.pdf', 15),
    ('/files/disease_history/16_report.pdf', '16_report.pdf', 16),
    ('/files/disease_history/17_report.pdf', '17_report.pdf', 17),
    ('/files/disease_history/18_report.pdf', '18_report.pdf', 18);

INSERT INTO MedicalHistories (Date, PreviousHeartDisease, HighBloodPressure, Diabetes, Hyperlipidemia, Obesity, Smoking, CardiacProcedures, SystemicDiseases, Medications, FamilyDiseases, OtherDetails, PatientId)
VALUES
    ('2023-01-15', 1, 0, 0, 0, 0, 1, 'Angioplasty', 'None', 'Aspirin', 'Hypertension', 'N/A', 1),
    ('2023-02-20', 0, 1, 1, 0, 1, 0, 'Bypass Surgery', 'Asthma', 'Metformin', 'Diabetes', 'N/A', 2),
    ('2023-03-10', 1, 0, 0, 1, 0, 1, 'Stent Placement', 'None', 'Lisinopril', 'Heart Disease', 'N/A', 3),
    ('2023-04-05', 0, 1, 1, 0, 0, 0, 'None', 'None', 'Simvastatin', 'High Cholesterol', 'N/A', 4),
    ('2023-05-12', 0, 0, 0, 0, 1, 1, 'None', 'None', 'None', 'Obesity', 'N/A', 5),
    ('2023-06-22', 1, 1, 0, 0, 0, 0, 'Pacemaker', 'None', 'Warfarin', 'Heart Disease', 'N/A', 6),
    ('2023-07-18', 0, 0, 1, 0, 1, 0, 'None', 'Diabetes', 'Insulin', 'Family History', 'N/A', 7),
    ('2023-08-30', 1, 0, 0, 0, 1, 1, 'Angioplasty', 'Hypertension', 'Amlodipine', 'High Blood Pressure', 'N/A', 8),
    ('2023-09-15', 0, 1, 0, 0, 0, 0, 'Bypass Surgery', 'None', 'Statins', 'Heart Disease', 'N/A', 9),
    ('2023-10-02', 1, 1, 1, 0, 0, 1, 'Stent Placement', 'None', 'Aspirin', 'Diabetes', 'N/A', 10),
    ('2023-11-12', 0, 0, 0, 0, 1, 0, 'None', 'None', 'None', 'Obesity', 'N/A', 11),
    ('2023-12-05', 1, 0, 1, 0, 0, 1, 'Pacemaker', 'None', 'Insulin', 'Diabetes', 'N/A', 12),
    ('2024-01-20', 0, 1, 0, 0, 0, 0, 'None', 'None', 'Amlodipine', 'High Blood Pressure', 'N/A', 13),
    ('2024-02-14', 1, 0, 0, 1, 0, 1, 'Angioplasty', 'Hypertension', 'Warfarin', 'Heart Disease', 'N/A', 14),
    ('2024-03-11', 0, 1, 1, 0, 0, 0, 'Bypass Surgery', 'Asthma', 'Lisinopril', 'Hypertension', 'N/A', 15),
    ('2024-04-01', 1, 0, 0, 0, 1, 1, 'Stent Placement', 'None', 'Simvastatin', 'High Cholesterol', 'N/A', 16),
    ('2024-05-15', 0, 0, 1, 0, 0, 0, 'None', 'Diabetes', 'Insulin', 'Family History', 'N/A', 17),
    ('2024-06-20', 1, 1, 0, 0, 0, 1, 'Pacemaker', 'None', 'Aspirin', 'Heart Disease', 'N/A', 18);

INSERT INTO PhysicalExaminations (Date, Time, Duration, MaxHeartRate, PeakPressure, ExerciseInducedSymptoms, AbnormalEcgFindings, Conclusion, PatientId)
VALUES
    ('2023-01-10', '09:00:00', '30 mins', 180, '120/80', 'None', 'Normal', 'Normal physical examination', 1),
    ('2023-02-15', '10:30:00', '45 mins', 175, '130/85', 'Mild chest pain', 'Slightly abnormal', 'Further tests recommended', 2),
    ('2023-03-20', '11:00:00', '30 mins', 190, '125/78', 'None', 'Normal', 'Normal physical examination', 3),
    ('2023-04-25', '09:45:00', '60 mins', 160, '135/90', 'Shortness of breath', 'Abnormal findings', 'Further evaluation needed', 4),
    ('2023-05-30', '08:00:00', '25 mins', 170, '118/76', 'None', 'Normal', 'Normal physical examination', 5),
    ('2023-06-12', '14:15:00', '40 mins', 185, '140/92', 'Fatigue during exercise', 'Abnormal findings', 'Consult cardiologist', 6),
    ('2023-07-19', '15:30:00', '35 mins', 160, '128/82', 'None', 'Normal', 'Normal physical examination', 7),
    ('2023-08-23', '10:00:00', '50 mins', 177, '132/85', 'Dizziness during exercise', 'Slightly abnormal', 'Further tests recommended', 8),
    ('2023-09-15', '09:30:00', '30 mins', 180, '120/80', 'None', 'Normal', 'Normal physical examination', 9),
    ('2023-10-05', '11:15:00', '45 mins', 185, '140/90', 'Chest tightness', 'Abnormal findings', 'Further evaluation needed', 10),
    ('2023-11-12', '08:45:00', '20 mins', 165, '115/75', 'None', 'Normal', 'Normal physical examination', 11),
    ('2023-12-22', '13:00:00', '55 mins', 178, '135/88', 'None', 'Normal', 'Normal physical examination', 12),
    ('2024-01-17', '09:00:00', '40 mins', 190, '138/90', 'None', 'Slightly abnormal', 'Further tests recommended', 13),
    ('2024-02-21', '10:30:00', '30 mins', 175, '125/80', 'None', 'Normal', 'Normal physical examination', 14),
    ('2024-03-15', '09:45:00', '50 mins', 182, '130/85', 'Fatigue during exercise', 'Abnormal findings', 'Consult cardiologist', 15),
    ('2024-04-10', '11:00:00', '60 mins', 177, '126/82', 'None', 'Normal', 'Normal physical examination', 16),
    ('2024-05-01', '14:00:00', '25 mins', 160, '118/76', 'None', 'Normal', 'Normal physical examination', 17),
    ('2024-06-12', '10:15:00', '35 mins', 172, '135/90', 'None', 'Slightly abnormal', 'Further evaluation needed', 18);

INSERT INTO Electrocardiograms (Date, HeartRhythm, IntervalsSegments, CharacteristicWaves, HeartRate, Abnormalities, Artifacts, Interpretation, DetailedFindings, BloodPressureSystolic, BloodPressureDiastolic, Temperature, ClinicalNotes, PatientId)
VALUES
    ('2023-01-12', 'Regular', 'Normal', 'P, QRS, T', '72 bpm', 'None', 'None', 'Normal ECG', 'No significant findings', 120, 80, 36.5, 'Patient stable', 1),
    ('2023-02-20', 'Atrial Fibrillation', 'Prolonged', 'P wave absent', '90 bpm', 'AF', 'None', 'Atrial Fibrillation', 'Recommended follow-up', 130, 85, 37.0, 'Consider medication', 2),
    ('2023-03-18', 'Regular', 'Normal', 'P, QRS, T', '68 bpm', 'None', 'None', 'Normal ECG', 'No significant findings', 115, 75, 36.7, 'Patient stable', 3),
    ('2023-04-15', 'Regular', 'Normal', 'P, QRS, T', '75 bpm', 'None', 'Motion artifacts', 'Normal ECG', 'Normal findings', 125, 80, 37.1, 'Monitor patient', 4),
    ('2023-05-10', 'Bradycardia', 'Normal', 'P, QRS, T', '58 bpm', 'None', 'None', 'Bradycardia observed', 'Follow-up recommended', 110, 70, 36.9, 'Consult cardiologist', 5),
    ('2023-06-25', 'Tachycardia', 'Normal', 'P, QRS, T', '110 bpm', 'Tachycardia', 'None', 'Tachycardia observed', 'Further investigation needed', 135, 88, 37.3, 'Stress test recommended', 6),
    ('2023-07-30', 'Regular', 'Normal', 'P, QRS, T', '70 bpm', 'None', 'None', 'Normal ECG', 'Normal findings', 120, 80, 36.6, 'Patient stable', 7),
    ('2023-08-18', 'Irregular', 'Prolonged QT', 'P, QRS, T', '85 bpm', 'QT prolongation', 'None', 'Further evaluation needed', 'Consult cardiologist', 140, 90, 37.5, 'Monitor heart rhythm', 8),
    ('2023-09-22', 'Regular', 'Normal', 'P, QRS, T', '76 bpm', 'None', 'None', 'Normal ECG', 'No significant findings', 118, 78, 36.8, 'Patient stable', 9),
    ('2023-10-14', 'Regular', 'Normal', 'P, QRS, T', '73 bpm', 'None', 'None', 'Normal ECG', 'Normal findings', 125, 82, 37.0, 'Monitor periodically', 10),
    ('2023-11-07', 'Regular', 'Normal', 'P, QRS, T', '80 bpm', 'None', 'None', 'Normal ECG', 'No significant findings', 130, 84, 36.4, 'Patient stable', 11),
    ('2023-12-05', 'Atrial Flutter', 'Normal', 'P wave sawtooth', '88 bpm', 'Atrial Flutter', 'None', 'Atrial Flutter observed', 'Further evaluation needed', 135, 87, 37.2, 'Consider anticoagulants', 12),
    ('2024-01-10', 'Regular', 'Normal', 'P, QRS, T', '75 bpm', 'None', 'None', 'Normal ECG', 'Normal findings', 120, 80, 36.5, 'Patient stable', 13),
    ('2024-02-01', 'Irregular', 'Prolonged', 'P wave absent', '95 bpm', 'AF', 'None', 'Atrial Fibrillation', 'Recommended follow-up', 140, 85, 37.1, 'Monitor closely', 14),
    ('2024-03-14', 'Regular', 'Normal', 'P, QRS, T', '70 bpm', 'None', 'None', 'Normal ECG', 'No significant findings', 115, 75, 36.8, 'Patient stable', 15),
    ('2024-04-20', 'Bradycardia', 'Normal', 'P, QRS, T', '55 bpm', 'None', 'None', 'Bradycardia observed', 'Follow-up recommended', 110, 70, 36.9, 'Consult cardiologist', 16),
    ('2024-05-05', 'Tachycardia', 'Normal', 'P, QRS, T', '120 bpm', 'Tachycardia', 'None', 'Tachycardia observed', 'Further investigation needed', 135, 88, 37.3, 'Stress test recommended', 17),
    ('2024-06-11', 'Regular', 'Normal', 'P, QRS, T', '72 bpm', 'None', 'None', 'Normal ECG', 'Normal findings', 120, 80, 36.6, 'Patient stable', 18);

INSERT INTO Echocardiograms (Date, CardiacDimensions, EjectionFraction, ValveFunction, VelocitiesBloodFlows, MovementCardiacWalls, PulmonaryArterialPressure, BloodFlow, Indications, Findings, ClinicalImpression, TechnicalDetails, PatientId)
VALUES
    ('2023-01-15', 'Normal', '60%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 1),
    ('2023-02-22', 'Enlarged', '50%', 'Moderate regurgitation', 'Increased', 'Hypokinetic', 'Elevated', 'Inadequate', 'Suspected heart failure', 'Left ventricle dilation', 'Left ventricular dysfunction', '3D echocardiography', 2),
    ('2023-03-10', 'Normal', '65%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 3),
    ('2023-04-18', 'Normal', '58%', 'Mild stenosis', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine evaluation', 'Mild aortic stenosis', 'Satisfactory', 'Doppler echocardiography', 4),
    ('2023-05-14', 'Dilated', '45%', 'Severe regurgitation', 'Increased', 'Severely hypokinetic', 'Elevated', 'Inadequate', 'Severe mitral regurgitation', 'Marked left atrial enlargement', 'Moderate to severe dysfunction', 'Tissue Doppler imaging', 5),
    ('2023-06-30', 'Normal', '62%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Follow-up on previous findings', 'No significant changes', 'Normal cardiac function', 'Standard echocardiogram technique', 6),
    ('2023-07-12', 'Thickened', '55%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Suspected cardiomyopathy', 'Mild left ventricular hypertrophy', 'Mildly reduced function', 'Contrast echocardiography', 7),
    ('2023-08-25', 'Normal', '63%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 8),
    ('2023-09-20', 'Normal', '57%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 9),
    ('2023-10-10', 'Normal', '61%', 'Mild regurgitation', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine evaluation', 'No significant changes', 'Normal cardiac function', 'Standard echocardiogram technique', 10),
    ('2023-11-05', 'Normal', '59%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Follow-up evaluation', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 11),
    ('2023-12-12', 'Enlarged', '48%', 'Severe stenosis', 'Increased', 'Hypokinetic', 'Elevated', 'Inadequate', 'Severe aortic stenosis', 'Left ventricle dilation', 'Moderate to severe dysfunction', '3D echocardiography', 12),
    ('2024-01-25', 'Normal', '64%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 13),
    ('2024-02-18', 'Normal', '60%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 14),
    ('2024-03-15', 'Normal', '66%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine check-up', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 15),
    ('2024-04-22', 'Normal', '50%', 'Mild regurgitation', 'Normal', 'Normal', 'Normal', 'Adequate', 'Routine evaluation', 'Mild mitral regurgitation', 'Mildly reduced function', 'Doppler echocardiography', 16),
    ('2024-05-09', 'Dilated', '47%', 'Severe regurgitation', 'Increased', 'Hypokinetic', 'Elevated', 'Inadequate', 'Severe mitral regurgitation', 'Marked left atrial enlargement', 'Moderate to severe dysfunction', 'Tissue Doppler imaging', 17),
    ('2024-06-14', 'Normal', '62%', 'Normal', 'Normal', 'Normal', 'Normal', 'Adequate', 'Follow-up evaluation', 'No significant findings', 'Normal cardiac function', 'Standard echocardiogram technique', 18);

INSERT INTO StressTests (Date, Time, Duration, MaxHeartRate, PeakPressure, ExerciseInducedSymptoms, RestingHeartRate, MaxBloodPressureSystolic, MaxBloodPressureDiastolic, ExerciseProtocol, Indications, AbnormalEcgFindings, Conclusion, PatientId)
VALUES
    ('2023-01-10', '09:00:00', '12 min', '180 bpm', '130/80 mmHg', 'None', 70, 150, 90, 'Bruce protocol', 'Routine check-up', 'Normal', 'No significant abnormalities', 1),
    ('2023-02-15', '10:30:00', '15 min', '175 bpm', '140/85 mmHg', 'Mild chest pain', 72, 160, 95, 'Bruce protocol', 'Symptoms of angina', 'Mild ST segment depression', 'Follow-up required', 2),
    ('2023-03-22', '08:15:00', '10 min', '170 bpm', '120/75 mmHg', 'None', 68, 145, 88, 'Modified Bruce protocol', 'Routine evaluation', 'Normal', 'No significant abnormalities', 3),
    ('2023-04-28', '11:00:00', '8 min', '165 bpm', '135/80 mmHg', 'Dizziness', 74, 155, 90, 'Bruce protocol', 'Assessment for arrhythmia', 'Normal', 'No significant findings', 4),
    ('2023-05-30', '09:45:00', '14 min', '182 bpm', '125/78 mmHg', 'Shortness of breath', 69, 150, 92, 'Bruce protocol', 'Follow-up on symptoms', 'Mild ST segment elevation', 'Further investigation needed', 5),
    ('2023-06-12', '10:15:00', '11 min', '178 bpm', '132/84 mmHg', 'None', 71, 148, 91, 'Bruce protocol', 'Routine evaluation', 'Normal', 'No significant abnormalities', 6),
    ('2023-07-19', '10:00:00', '13 min', '180 bpm', '140/80 mmHg', 'Fatigue', 70, 155, 90, 'Bruce protocol', 'Risk assessment', 'Normal', 'No significant findings', 7),
    ('2023-08-25', '08:30:00', '16 min', '172 bpm', '128/76 mmHg', 'None', 73, 150, 85, 'Bruce protocol', 'Routine evaluation', 'Normal', 'No significant abnormalities', 8),
    ('2023-09-14', '09:00:00', '12 min', '169 bpm', '130/80 mmHg', 'None', 74, 148, 89, 'Bruce protocol', 'Monitoring recovery', 'Normal', 'No significant findings', 9),
    ('2023-10-05', '11:30:00', '10 min', '160 bpm', '135/82 mmHg', 'Mild chest discomfort', 75, 155, 91, 'Bruce protocol', 'Assessment of coronary artery disease', 'Mild ST segment depression', 'Further testing required', 10),
    ('2023-11-16', '09:15:00', '15 min', '183 bpm', '130/80 mmHg', 'None', 72, 158, 93, 'Bruce protocol', 'Routine follow-up', 'Normal', 'No significant abnormalities', 11),
    ('2023-12-20', '10:45:00', '13 min', '175 bpm', '140/85 mmHg', 'Dizziness', 73, 160, 94, 'Bruce protocol', 'Symptoms of heart failure', 'Normal', 'No significant findings', 12),
    ('2024-01-30', '08:00:00', '14 min', '180 bpm', '128/76 mmHg', 'None', 70, 150, 90, 'Bruce protocol', 'Routine check-up', 'Normal', 'No significant abnormalities', 13),
    ('2024-02-15', '10:00:00', '11 min', '170 bpm', '135/80 mmHg', 'None', 71, 145, 88, 'Bruce protocol', 'Follow-up on previous symptoms', 'Normal', 'No significant findings', 14),
    ('2024-03-10', '09:30:00', '12 min', '167 bpm', '130/80 mmHg', 'Fatigue', 69, 152, 89, 'Bruce protocol', 'Routine evaluation', 'Normal', 'No significant abnormalities', 15),
    ('2024-04-18', '10:20:00', '10 min', '175 bpm', '140/85 mmHg', 'None', 74, 160, 92, 'Bruce protocol', 'Monitoring condition', 'Normal', 'No significant findings', 16),
    ('2024-05-25', '09:00:00', '15 min', '180 bpm', '130/80 mmHg', 'Mild chest pain', 72, 155, 90, 'Bruce protocol', 'Routine check-up', 'Mild ST segment depression', 'Follow-up needed', 17),
    ('2024-06-30', '10:00:00', '12 min', '172 bpm', '130/80 mmHg', 'None', 70, 150, 85, 'Bruce protocol', 'Routine evaluation', 'Normal', 'No significant abnormalities', 18);

INSERT INTO HolterStudies (Date, Time, StudyDuration, AverageHeartRate, MaximumHeartRate, TypeHeartRhythm, PhysicalActivity, Conclusion, PatientId)
VALUES
    ('2024-01-10', '08:00:00', '24 hours', 72, 180, 'Normal sinus rhythm', 'Light exercise', 'Normal findings', 1),
    ('2024-02-15', '09:30:00', '48 hours', 76, 185, 'Atrial fibrillation', 'Resting', 'Atrial fibrillation episodes noted', 2),
    ('2024-03-12', '10:00:00', '24 hours', 70, 175, 'Normal sinus rhythm', 'Daily activities', 'Normal findings', 3),
    ('2024-04-05', '07:45:00', '36 hours', 78, 190, 'Premature ventricular contractions', 'Light exercise', 'PVCs noted during exercise', 4),
    ('2024-05-20', '10:15:00', '24 hours', 75, 180, 'Normal sinus rhythm', 'Resting', 'Normal findings', 5),
    ('2024-06-10', '09:00:00', '48 hours', 80, 200, 'Atrial flutter', 'Moderate exercise', 'Atrial flutter episodes observed', 6),
    ('2024-07-15', '10:30:00', '24 hours', 74, 178, 'Normal sinus rhythm', 'Daily activities', 'Normal findings', 7),
    ('2024-08-05', '11:00:00', '36 hours', 77, 182, 'Supraventricular tachycardia', 'Light exercise', 'SVT episodes recorded', 8),
    ('2024-09-20', '08:45:00', '24 hours', 73, 177, 'Normal sinus rhythm', 'Resting', 'Normal findings', 9),
    ('2024-10-10', '09:15:00', '48 hours', 79, 185, 'Atrial fibrillation', 'Daily activities', 'Atrial fibrillation episodes noted', 10),
    ('2024-11-05', '07:30:00', '24 hours', 72, 172, 'Normal sinus rhythm', 'Light exercise', 'Normal findings', 11),
    ('2024-12-20', '09:00:00', '36 hours', 76, 190, 'Ventricular tachycardia', 'Moderate exercise', 'Ventricular tachycardia noted', 12),
    ('2025-01-15', '10:15:00', '24 hours', 75, 180, 'Normal sinus rhythm', 'Resting', 'Normal findings', 13),
    ('2025-02-20', '08:00:00', '48 hours', 78, 185, 'Normal sinus rhythm', 'Daily activities', 'Normal findings', 14),
    ('2025-03-18', '11:00:00', '24 hours', 70, 176, 'Bradycardia', 'Light exercise', 'Bradycardia episodes noted', 15),
    ('2025-04-12', '09:45:00', '36 hours', 74, 180, 'Normal sinus rhythm', 'Moderate exercise', 'Normal findings', 16),
    ('2025-05-30', '10:30:00', '24 hours', 79, 190, 'Tachycardia', 'Light exercise', 'Tachycardia episodes recorded', 17),
    ('2025-06-25', '08:30:00', '48 hours', 72, 178, 'Normal sinus rhythm', 'Daily activities', 'Normal findings', 18);

INSERT INTO ArrhythmiaEvents (Type, Duration, HeartRateDuringEvent, Description, HolterStudyId)
VALUES
    ('Atrial Fibrillation', '5 minutes', 130, 'Patient experienced episodes of rapid heart rate.', 1),
    ('Premature Ventricular Contraction', '3 minutes', 115, 'Irregular heartbeat noted with PVCs.', 2),
    ('Ventricular Tachycardia', '2 minutes', 150, 'Sustained V-Tach observed during stress test.', 3),
    ('Bradycardia', '4 minutes', 50, 'Patient had episodes of bradycardia.', 4),
    ('Supraventricular Tachycardia', '6 minutes', 140, 'Patient reported episodes of rapid heartbeat.', 5),
    ('Atrial Flutter', '3 minutes', 125, 'Intermittent atrial flutter episodes recorded.', 6),
    ('Ventricular Fibrillation', '1 minute', 200, 'Emergency V-Fib episode recorded.', 7),
    ('Sinus Tachycardia', '5 minutes', 130, 'Increased heart rate during exercise.', 8),
    ('Couplets', '3 minutes', 120, 'Couplets of PVCs observed.', 9),
    ('Bigeminy', '4 minutes', 110, 'Bigeminal rhythm noted during monitoring.', 10),
    ('Trigeminy', '5 minutes', 115, 'Trigeminal rhythm observed.', 11),
    ('Atrial Ectopy', '2 minutes', 125, 'Multiple atrial ectopic beats recorded.', 12),
    ('Multifocal PVCs', '3 minutes', 135, 'Multiple PVCs from different foci noted.', 13),
    ('Tachyarrhythmia', '6 minutes', 145, 'Episodes of tachyarrhythmia observed.', 14),
    ('Escape Rhythm', '4 minutes', 60, 'Escape rhythm detected during monitoring.', 15),
    ('Atrial Standstill', '5 minutes', 50, 'Episodes of atrial standstill recorded.', 16),
    ('Atrial Tachycardia', '7 minutes', 145, 'Atrial tachycardia observed.', 17),
    ('Ventricular Escape Beats', '3 minutes', 70, 'Ventricular escape beats noted.', 18);

INSERT INTO MedicationAdministrations (MedicationName, AdministrationDateTime, Dosage, HolterStudyId)
VALUES
    ('Atenolol', '2024-09-01 08:00:00', '50 mg', 1),
    ('Metoprolol', '2024-09-02 09:00:00', '25 mg', 1),
    ('Aspirin', '2024-09-03 10:00:00', '81 mg', 2),
    ('Lisinopril', '2024-09-04 11:00:00', '10 mg', 3),
    ('Simvastatin', '2024-09-05 12:00:00', '20 mg', 4),
    ('Atorvastatin', '2024-09-06 07:30:00', '40 mg', 5),
    ('Diltiazem', '2024-09-07 08:30:00', '120 mg', 6),
    ('Furosemide', '2024-09-08 09:15:00', '20 mg', 7),
    ('Warfarin', '2024-09-09 10:45:00', '5 mg', 8),
    ('Clopidogrel', '2024-09-10 14:00:00', '75 mg', 9),
    ('Digoxin', '2024-09-11 11:30:00', '0.25 mg', 10),
    ('Amiodarone', '2024-09-12 15:00:00', '200 mg', 11),
    ('Hydrochlorothiazide', '2024-09-13 09:00:00', '12.5 mg', 12),
    ('Ramipril', '2024-09-14 08:00:00', '5 mg', 13),
    ('Nifedipine', '2024-09-15 10:30:00', '30 mg', 14),
    ('Amlodipine', '2024-09-16 14:15:00', '10 mg', 15),
    ('Isosorbide Dinitrate', '2024-09-17 16:00:00', '20 mg', 16),
    ('Sotalol', '2024-09-18 10:00:00', '80 mg', 17),
    ('Propranolol', '2024-09-19 11:00:00', '40 mg', 18);

INSERT INTO PatientSymptoms (SymptomName, SymptomDateTime, Description, HolterStudyId)
VALUES
    ('Chest Pain', '2024-09-01 08:30:00', 'Sharp pain in the left chest area.', 1),
    ('Shortness of Breath', '2024-09-01 09:00:00', 'Difficulty breathing during physical activity.', 1),
    ('Palpitations', '2024-09-02 10:15:00', 'Feeling of rapid heartbeats.', 1),
    ('Dizziness', '2024-09-03 11:00:00', 'Feeling lightheaded while standing.', 2),
    ('Fatigue', '2024-09-04 09:45:00', 'Extreme tiredness after minimal exertion.', 3),
    ('Nausea', '2024-09-05 12:30:00', 'Feeling sick to the stomach.', 4),
    ('Sweating', '2024-09-06 10:00:00', 'Excessive sweating without physical exertion.', 5),
    ('Anxiety', '2024-09-07 14:30:00', 'Feeling of impending doom.', 6),
    ('Back Pain', '2024-09-08 11:30:00', 'Persistent pain in the middle back.', 7),
    ('Weakness', '2024-09-09 09:15:00', 'General weakness felt during daily activities.', 8),
    ('Heartburn', '2024-09-10 15:00:00', 'Burning sensation in the chest after eating.', 9),
    ('Cold Sweats', '2024-09-11 08:00:00', 'Sweating with no apparent reason.', 10),
    ('Numbness', '2024-09-12 10:30:00', 'Numbness in the left arm.', 11),
    ('Cough', '2024-09-13 09:45:00', 'Dry cough occurring during night.', 12),
    ('High Blood Pressure', '2024-09-14 08:15:00', 'Feeling of pressure in the head.', 13),
    ('Headache', '2024-09-15 14:45:00', 'Severe headache during exertion.', 14),
    ('Fainting', '2024-09-16 11:00:00', 'Lost consciousness briefly after exertion.', 15),
    ('Tingling', '2024-09-17 09:30:00', 'Tingling sensation in fingers.', 16),
    ('Heart Rate Variability', '2024-09-18 10:00:00', 'Noticing changes in heart rate during the day.', 17),
    ('Other', '2024-09-19 12:00:00', 'Reported various symptoms not previously listed.', 18);

INSERT INTO ClinicalEvaluations (EvaluationDateTime, Findings, Recommendations, HolterStudyId)
VALUES
    ('2024-09-01 14:00:00', 'Normal heart rhythm observed, no arrhythmias detected.', 'Continue regular monitoring and follow-up in 6 months.', 1),
    ('2024-09-02 15:30:00', 'Minor ectopic beats noted during exercise.', 'Consider lifestyle changes and repeat Holter study in 3 months.', 2),
    ('2024-09-03 10:00:00', 'Transient ST segment depression observed.', 'Recommend further investigation with a stress test.', 3),
    ('2024-09-04 11:30:00', 'Elevated heart rate during sleep.', 'Monitor sleep patterns and consider a sleep study.', 4),
    ('2024-09-05 13:15:00', 'Episodes of tachycardia noted.', 'Evaluate medication regimen and lifestyle factors.', 5),
    ('2024-09-06 09:45:00', 'Normal echocardiogram results, good left ventricular function.', 'Maintain current treatment plan.', 6),
    ('2024-09-07 16:00:00', 'No significant findings; patient reports occasional palpitations.', 'Educate on lifestyle modifications.', 7),
    ('2024-09-08 14:00:00', 'Signs of left atrial enlargement.', 'Refer to a cardiologist for further evaluation.', 8),
    ('2024-09-09 10:30:00', 'Arrhythmias present, requires further monitoring.', 'Schedule follow-up Holter study in 1 month.', 9),
    ('2024-09-10 12:45:00', 'Patient reported fatigue and dizziness during exertion.', 'Adjust medication and increase activity gradually.', 10),
    ('2024-09-11 11:00:00', 'No arrhythmias detected during monitoring.', 'Continue with routine check-ups.', 11),
    ('2024-09-12 13:30:00', 'Ventricular ectopy observed.', 'Consider cardiology referral for further assessment.', 12),
    ('2024-09-13 15:00:00', 'Normal findings, patient has well-controlled blood pressure.', 'Continue current medications.', 13),
    ('2024-09-14 09:30:00', 'Minor irregularities in heart rhythm.', 'Repeat Holter monitoring in 2 months.', 14),
    ('2024-09-15 14:15:00', 'Symptoms consistent with stress-induced arrhythmias.', 'Recommend relaxation techniques and stress management.', 15),
    ('2024-09-16 11:45:00', 'Patient reports no symptoms; normal heart function.', 'Annual check-up recommended.', 16),
    ('2024-09-17 10:00:00', 'Occasional premature ventricular contractions observed.', 'Lifestyle changes encouraged; monitor symptoms.', 17),
    ('2024-09-18 12:30:00', 'Findings consistent with previous evaluations.', 'Maintain treatment plan, follow-up in 6 months.', 18);

INSERT INTO AdditionalTestResults (TestName, TestDateTime, Results, HolterStudyId)
VALUES
    ('Lipid Panel', '2024-09-01 08:30:00', 'Cholesterol levels within normal range.', 1),
    ('Complete Blood Count', '2024-09-02 09:00:00', 'No abnormalities detected, all values normal.', 2),
    ('Thyroid Function Test', '2024-09-03 10:15:00', 'TSH levels normal.', 3),
    ('Echocardiogram', '2024-09-04 11:00:00', 'Left ventricular function is normal.', 4),
    ('Stress Test', '2024-09-05 13:30:00', 'Achieved target heart rate, no arrhythmias during test.', 5),
    ('Chest X-Ray', '2024-09-06 14:45:00', 'No significant findings, heart and lungs clear.', 6),
    ('Holter Monitor', '2024-09-07 08:00:00', 'No significant arrhythmias detected over 24-hour monitoring.', 7),
    ('Cardiac MRI', '2024-09-08 12:00:00', 'No signs of myocardial damage.', 8),
    ('Pulmonary Function Test', '2024-09-09 10:30:00', 'Lung function within normal limits.', 9),
    ('CT Angiogram', '2024-09-10 09:15:00', 'No blockages in coronary arteries.', 10),
    ('Electrophysiology Study', '2024-09-11 14:00:00', 'Normal conduction, no arrhythmias induced.', 11),
    ('Abdominal Ultrasound', '2024-09-12 11:45:00', 'No abnormalities found in abdominal organs.', 12),
    ('Cardiac Biomarker Test', '2024-09-13 08:30:00', 'Troponin levels normal.', 13),
    ('24-hour Blood Pressure Monitoring', '2024-09-14 15:00:00', 'Blood pressure readings within normal limits.', 14),
    ('Genetic Testing', '2024-09-15 09:30:00', 'No genetic markers for inherited heart disease.', 15),
    ('Sleep Study', '2024-09-16 14:30:00', 'No sleep apnea detected.', 16),
    ('Diabetes Screening', '2024-09-17 11:00:00', 'Glucose levels normal, no signs of diabetes.', 17),
    ('Cardiac CT for Calcium Scoring', '2024-09-18 13:15:00', 'Calcium score of 0, no significant risk.', 18);

INSERT INTO CardiacCatheterizationStudies (Date, Time, LocationMainCoronaryArteries, BlockageEachCoronaryArtery, DescriptionAbnormalities, SystolicPressureAorta, DiastolicPressureAorta, ChambersLeftAtrium, ChambersLeftVentricle, ChambersRightAtrium, ChambersRightVentricle, BloodFlowCoronaryArteries, VelocityBloodFlow, LeftVentricularEjectionFraction, SystolicPressurePulmonaryArteries, DiastolicPressurePulmonaryArteries, ValvularInsufficiencyAortic, ValvularInsufficiencyMitral, ValvularInsufficiencyPulmonary, ValvularInsufficiencyTricuspid, PressureGradientValves, StructuralAbnormalities, CardiacChamberFunctions, DescriptionComplications, Conclusion, PatientId)
VALUES
    ('2024-08-01', '10:15:00', 'Left Anterior Descending Artery', 80.5, 'Narrowing observed near bifurcation', 140, 80, 'Mild dilation', 'Normal', 'Normal', 'Mild dilation', 3.5, 20.2, 55.0, 25, 15, 'Mild regurgitation', 'No insufficiency', 'Mild regurgitation', 'No insufficiency', 15.2, 'No structural abnormalities', 'Good function', 'No complications', 'Study consistent with coronary artery disease.', 1),
    ('2024-08-02', '11:00:00', 'Right Coronary Artery', 90.3, 'Severe stenosis in proximal segment', 150, 85, 'Normal', 'Hypokinesis observed', 'Normal', 'Normal', 2.8, 18.5, 45.0, 30, 18, 'No insufficiency', 'Moderate regurgitation', 'No insufficiency', 'Mild regurgitation', 12.0, 'Left ventricular hypertrophy', 'Moderate dysfunction in left ventricle', 'Bleeding controlled', 'Critical stenosis requiring intervention.', 2),
    ('2024-08-03', '09:45:00', 'Circumflex Artery', 65.0, 'Plaque buildup observed', 130, 75, 'Normal', 'Normal', 'Normal', 'Mild dilation', 3.0, 19.8, 60.0, 28, 17, 'No insufficiency', 'No insufficiency', 'No insufficiency', 'No insufficiency', 10.8, 'Atrial septal defect', 'Normal chamber function', 'No complications', 'Stable atherosclerotic plaque with mild narrowing.', 3),
    ('2024-08-04', '12:30:00', 'Left Circumflex Artery', 50.0, 'Mild stenosis', 120, 70, 'Normal', 'Normal', 'Normal', 'Normal', 4.2, 22.1, 65.0, 20, 12, 'No insufficiency', 'No insufficiency', 'No insufficiency', 'No insufficiency', 8.5, 'No structural abnormalities', 'Normal', 'No complications', 'Normal study with mild narrowing in circumflex artery.', 4),
    ('2024-08-05', '13:15:00', 'Left Main Coronary Artery', 95.0, 'Critical stenosis in left main artery', 160, 90, 'Normal', 'Severe hypokinesis', 'Normal', 'Normal', 2.5, 15.6, 40.0, 35, 20, 'Severe regurgitation', 'Severe regurgitation', 'No insufficiency', 'No insufficiency', 20.0, 'Left ventricular aneurysm', 'Severely impaired', 'Arrhythmias during study', 'Severe left main disease requiring immediate intervention.', 5);

INSERT INTO BloodTests (Date, Hemoglobin, Hematocrit, WhiteBloodCell, Platelets, Glucose, CholesterolHDL, CholesterolLDL, Triglycerides, RedBloodCell, MeanCorpuscularVolume, MeanCorpuscularHemoglobin, MeanCorpuscularHemoglobinConcentration, RedCellDistributionWidth, BloodUreaNitrogen, Creatinine, Sodium, Potassium, Chloride, Bicarbonate, Calcium, Magnesium, Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils, PatientId)
VALUES
('2024-08-01', 14.5, 44.2, 6500, 250000, 95.0, 60.0, 120.0, 150.0, 5.0, 90.5, 30.2, 33.0, 12.5, 18.0, 1.2, 138, 4.5, 100, 25, 9.5, 2.0, 60.0, 30.0, 6.0, 3.0, 1.0, 1),
('2024-08-02', 13.2, 41.0, 7000, 220000, 102.0, 55.0, 135.0, 160.0, 4.8, 89.0, 29.5, 32.5, 11.8, 19.0, 1.0, 140, 4.0, 98, 24, 9.2, 2.1, 58.0, 32.0, 5.0, 4.0, 1.0, 2),
('2024-08-03', 12.8, 39.5, 8000, 200000, 110.0, 65.0, 130.0, 170.0, 4.7, 91.0, 31.0, 34.0, 12.0, 20.5, 1.3, 137, 4.2, 102, 26, 9.8, 2.3, 62.0, 28.0, 7.0, 2.0, 1.0, 3),
('2024-08-04', 14.0, 42.0, 6800, 230000, 105.0, 57.0, 125.0, 155.0, 4.9, 92.0, 29.8, 33.2, 11.9, 19.5, 1.4, 136, 4.3, 99, 27, 9.4, 2.0, 64.0, 26.0, 5.0, 4.0, 1.0, 4),
('2024-08-05', 15.0, 45.5, 6900, 260000, 92.0, 62.0, 118.0, 145.0, 5.1, 93.5, 31.5, 34.8, 12.2, 17.5, 1.1, 139, 4.6, 101, 25, 9.7, 2.5, 61.0, 29.0, 6.0, 3.0, 1.0, 5),
('2024-08-06', 13.0, 40.0, 7200, 210000, 115.0, 59.0, 122.0, 165.0, 4.6, 88.5, 28.9, 32.8, 11.6, 21.0, 1.2, 135, 4.1, 103, 23, 9.0, 2.2, 59.0, 33.0, 5.0, 3.0, 1.0, 6);

INSERT INTO BloodTests (Date, Hemoglobin, Hematocrit, WhiteBloodCell, Platelets, Glucose, CholesterolHDL, CholesterolLDL, Triglycerides, RedBloodCell, MeanCorpuscularVolume, MeanCorpuscularHemoglobin, MeanCorpuscularHemoglobinConcentration, RedCellDistributionWidth, BloodUreaNitrogen, Creatinine, Sodium, Potassium, Chloride, Bicarbonate, Calcium, Magnesium, Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils, PatientId)
VALUES
('2024-08-07', 12.5, 38.5, 7500, 225000, 108.0, 58.0, 140.0, 180.0, 4.8, 89.5, 30.5, 32.9, 12.1, 20.0, 1.5, 137, 4.7, 98, 26, 9.3, 2.2, 63.0, 27.0, 5.5, 3.5, 1.0, 7),
('2024-08-08', 14.7, 45.2, 6900, 240000, 101.0, 61.0, 123.0, 152.0, 5.0, 90.0, 31.2, 34.0, 11.7, 18.5, 1.4, 141, 4.3, 97, 25, 9.6, 2.3, 62.5, 31.0, 6.0, 2.5, 1.0, 8),
('2024-08-09', 13.8, 42.0, 7000, 210000, 113.0, 63.0, 132.0, 160.0, 4.7, 92.1, 30.1, 33.0, 12.0, 22.0, 1.1, 139, 4.5, 100, 24, 9.9, 2.6, 61.0, 30.0, 6.0, 3.0, 1.0, 9),
('2024-08-10', 13.0, 40.5, 6800, 200000, 109.0, 64.0, 125.0, 148.0, 4.9, 91.0, 29.9, 34.5, 11.4, 19.8, 1.3, 140, 4.0, 99, 26, 9.2, 2.5, 59.5, 32.0, 5.0, 4.0, 1.0, 10),
('2024-08-11', 15.2, 47.0, 7100, 230000, 96.0, 60.0, 130.0, 155.0, 5.2, 92.5, 32.1, 35.0, 12.5, 17.2, 1.2, 138, 4.2, 101, 25, 9.4, 2.0, 60.0, 29.0, 6.5, 2.0, 1.0, 11),
('2024-08-12', 12.9, 39.0, 7200, 210000, 112.0, 66.0, 137.0, 172.0, 4.6, 88.0, 30.3, 32.7, 11.8, 21.0, 1.1, 136, 4.6, 104, 23, 9.7, 2.4, 58.0, 33.5, 5.0, 3.0, 1.0, 12),

('2024-08-13', 13.4, 41.5, 7400, 235000, 100.0, 57.0, 128.0, 158.0, 5.1, 90.3, 31.0, 33.9, 11.5, 19.0, 1.0, 139, 4.4, 102, 24, 9.1, 2.1, 64.0, 28.0, 6.5, 3.0, 1.0, 13),
('2024-08-14', 14.3, 44.0, 6750, 218000, 95.0, 59.0, 121.0, 153.0, 4.9, 92.2, 30.9, 34.2, 12.0, 18.0, 1.3, 141, 4.7, 98, 25, 9.5, 2.6, 60.0, 30.0, 5.0, 3.5, 1.0, 14),
('2024-08-15', 12.8, 38.8, 7700, 225000, 107.0, 61.0, 129.0, 165.0, 4.7, 88.5, 29.8, 32.5, 12.2, 20.0, 1.2, 137, 4.1, 103, 27, 9.8, 2.7, 63.0, 32.5, 6.0, 2.0, 1.0, 15),
('2024-08-16', 14.9, 46.5, 7200, 240000, 98.0, 60.0, 134.0, 178.0, 5.3, 93.0, 32.5, 34.0, 11.9, 16.5, 1.4, 135, 4.2, 100, 26, 9.6, 2.3, 58.5, 29.5, 5.0, 4.0, 1.0, 16),
('2024-08-17', 13.9, 42.5, 6900, 220000, 102.0, 62.0, 126.0, 159.0, 4.8, 91.1, 30.6, 33.7, 12.3, 19.5, 1.5, 140, 4.4, 99, 25, 9.3, 2.0, 60.5, 31.0, 5.5, 2.5, 1.0, 17),
('2024-08-18', 12.7, 37.5, 7600, 215000, 110.0, 64.0, 133.0, 170.0, 4.6, 89.0, 29.5, 32.3, 11.7, 21.5, 1.1, 136, 4.5, 104, 23, 9.4, 2.2, 61.0, 28.5, 5.0, 3.0, 1.0, 18);

INSERT INTO Diagnostics (Date, ConditionName, Description, ClassificationCondition, Severity, RiskAssessment, Conclusions, Recommendations, FollowUpPlan, PatientId)
VALUES
-- Diagnostic records for patients
('2024-08-01', 'Hypertension', 'Persistent elevated blood pressure readings.', 'Cardiovascular', 'Moderate', 'Risk of heart disease.', 'Patient advised to monitor blood pressure.', 'Lifestyle modifications recommended.', 'Follow-up in 1 month.', 1),
('2024-08-02', 'Type 2 Diabetes', 'Chronic condition affecting glucose metabolism.', 'Endocrine', 'Severe', 'High risk for cardiovascular diseases.', 'Patient needs medication adjustment.', 'Diet and exercise plan advised.', 'Follow-up in 3 months.', 2),
('2024-08-03', 'Asthma', 'Chronic respiratory condition with wheezing.', 'Respiratory', 'Moderate', 'Risk of acute asthma attacks.', 'Inhaler usage confirmed.', 'Avoid triggers and monitor symptoms.', 'Follow-up in 6 weeks.', 3),
('2024-08-04', 'Chronic Kidney Disease', 'Progressive loss of kidney function.', 'Renal', 'Severe', 'High risk for kidney failure.', 'Patient referred to nephrologist.', 'Dietary modifications recommended.', 'Follow-up in 2 months.', 4),
('2024-08-05', 'Hyperlipidemia', 'Elevated cholesterol and triglyceride levels.', 'Metabolic', 'Moderate', 'Increased risk of heart disease.', 'Patient started on statin therapy.', 'Regular lipid panel tests recommended.', 'Follow-up in 3 months.', 5),
('2024-08-06', 'Anxiety Disorder', 'Chronic anxiety affecting daily activities.', 'Mental Health', 'Moderate', 'Risk of depression.', 'Patient referred for therapy.', 'Medication review and stress management strategies.', 'Follow-up in 1 month.', 6),
('2024-08-07', 'Osteoarthritis', 'Degenerative joint disease causing pain.', 'Musculoskeletal', 'Moderate', 'Risk of reduced mobility.', 'Patient advised on physical therapy.', 'Pain management strategies recommended.', 'Follow-up in 2 months.', 7),
('2024-08-08', 'Depression', 'Persistent sadness and loss of interest.', 'Mental Health', 'Severe', 'Risk of self-harm.', 'Patient requires urgent mental health support.', 'Therapy and medication prescribed.', 'Follow-up in 2 weeks.', 8),
('2024-08-09', 'Allergic Rhinitis', 'Allergy-related nasal inflammation.', 'Allergic', 'Mild', 'Risk of asthma exacerbation.', 'Patient advised to avoid allergens.', 'Antihistamines recommended.', 'Follow-up in 1 month.', 9),
('2024-08-10', 'Gastroesophageal Reflux Disease', 'Chronic acid reflux affecting esophagus.', 'Gastrointestinal', 'Moderate', 'Risk of esophageal damage.', 'Patient started on proton pump inhibitors.', 'Dietary changes advised.', 'Follow-up in 3 months.', 10);

INSERT INTO Treatments (Date, Medication, Dosage, Instructions, OtherTreatments, SideEffects, TreatmentMonitoring, TreatmentDuration, TreatmentOutcome, PatientId)
VALUES
-- Treatment records for patients
('2024-08-01', 'Lisinopril', '10 mg daily', 'Take with or without food.', 'Lifestyle changes', 'Dizziness, cough', 'Monitor blood pressure weekly', '6 months', 'Blood pressure controlled', 1),
('2024-08-02', 'Metformin', '500 mg twice daily', 'Take with meals.', 'Diet and exercise', 'Nausea, diarrhea', 'Check blood glucose levels regularly', 'Indefinite', 'Blood glucose stabilized', 2),
('2024-08-03', 'Albuterol Inhaler', '90 mcg as needed', 'Inhale as directed during an asthma attack.', 'Pulmonary rehabilitation', 'Tremors, increased heart rate', 'Monitor usage frequency', 'As needed', 'Asthma symptoms managed', 3),
('2024-08-04', 'Atorvastatin', '20 mg daily', 'Take in the evening.', 'Dietary changes', 'Muscle pain, liver enzymes elevation', 'Lipid levels checked every 3 months', 'Indefinite', 'Cholesterol levels reduced', 10),
('2024-08-05', 'Sertraline', '50 mg daily', 'Take consistently at the same time.', 'Cognitive behavioral therapy', 'Nausea, fatigue', 'Monitor mood and anxiety levels', 'Indefinite', 'Depression symptoms improved', 5),
('2024-08-06', 'Ibuprofen', '400 mg every 8 hours as needed', 'Take with food.', 'Physical therapy', 'Gastrointestinal upset, headache', 'Assess pain levels regularly', 'As needed', 'Pain managed', 13),
('2024-08-07', 'Levothyroxine', '75 mcg daily', 'Take on an empty stomach.', 'Regular follow-ups', 'Weight changes, insomnia', 'Monitor thyroid levels every 6 weeks', 'Indefinite', 'Thyroid levels stable', 7),
('2024-08-08', 'Montelukast', '10 mg daily', 'Take in the evening.', 'Avoid allergens', 'Headache, stomach pain', 'Monitor respiratory status', 'Indefinite', 'Allergy symptoms improved', 15),
('2024-08-09', 'Prednisone', '10 mg daily for 5 days', 'Take with food.', 'Rest and hydration', 'Increased appetite, mood changes', 'Assess symptoms daily', '5 days', 'Inflammation reduced', 9),
('2024-08-10', 'Omeprazole', '20 mg daily', 'Take before meals.', 'Dietary modifications', 'Nausea, headache', 'Monitor for symptom relief', 'Indefinite', 'GERD symptoms improved', 18);

INSERT INTO CardiologySurgeries (AppUserId, SurgeryName, Date, Time, ProcedureDescription, Notes, IsEmergency, IsElective, OperationRoom, PreOpDiagnosis, PostOpDiagnosis, IsSuccessful, Duration, CardiacCondition, IsMinimallyInvasive, Complications, PostOperativeStatus, AnesthesiaType, SurgicalTeam, IntraoperativeFindings, PostOperativeInstructions, PatientId)
VALUES
-- Cardiology surgery records with corresponding AppUserId and PatientId
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Coronary Artery Bypass Grafting', '2024-09-01', '09:00:00', 'Surgical procedure to bypass blocked coronary arteries.', 'Monitor for bleeding.', true, false, 'OR 101', 'Coronary artery disease', 'Improved blood flow', true, 4.5, 'Coronary artery disease', false, 'None', 'Stable', 'General anesthesia', 'Dr. Smith, Dr. Lee', 'Blocked artery successfully bypassed.', 'Follow up in 2 weeks', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Aortic Valve Replacement', '2024-09-02', '11:00:00', 'Replacement of the aortic valve due to stenosis.', 'Post-operative pain management required.', false, true, 'OR 102', 'Aortic stenosis', 'Normal valve function', true, 3.0, 'Aortic stenosis', false, 'None', 'Stable', 'General anesthesia', 'Dr. Johnson, Dr. Brown', 'Valve replacement successful.', 'Follow up in 3 weeks', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Angioplasty', '2024-09-03', '14:00:00', 'Minimally invasive procedure to open narrowed arteries.', 'Patient education on lifestyle changes.', false, false, 'OR 103', 'Coronary artery disease', 'Opened arteries', true, 2.0, 'Coronary artery disease', true, 'None', 'Stable', 'Local anesthesia', 'Dr. Wilson, Dr. Taylor', 'Arteries successfully opened.', 'Follow up in 1 month', 3),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Mitral Valve Repair', '2024-09-04', '10:00:00', 'Repair of the mitral valve to correct regurgitation.', 'Close monitoring required post-op.', true, false, 'OR 104', 'Mitral regurgitation', 'Normal valve function', true, 4.0, 'Mitral regurgitation', false, 'None', 'Stable', 'General anesthesia', 'Dr. White, Dr. Green', 'Mitral valve successfully repaired.', 'Follow up in 2 weeks', 4),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Pacemaker Implantation', '2024-09-05', '08:30:00', 'Implantation of a pacemaker to regulate heart rhythm.', 'Monitor heart rate post-op.', false, true, 'OR 105', 'Bradycardia', 'Normal heart rhythm', true, 2.5, 'Bradycardia', true, 'Infection risk', 'Stable', 'Local anesthesia', 'Dr. Black, Dr. Blue', 'Pacemaker functioning properly.', 'Follow up in 1 month', 5);


INSERT INTO SurgeryFollowUps (FollowUpDate, FollowUpNotes, Complications, Recommendations, FunctionalAssessment, IsFollowUpComplete, CardiologySurgeryId)
VALUES
-- Follow-ups for Surgery ID 1 (Coronary Artery Bypass Grafting)
('2024-09-15', 'Patient is recovering well with no signs of infection.', 'None', 'Continue cardiac rehab.', 'Good', false, 1),
('2024-10-01', 'Mild shortness of breath, advised to continue physical therapy.', 'Mild SOB', 'Increase frequency of rehab sessions.', 'Fair', false, 1),

-- Follow-ups for Surgery ID 2 (Aortic Valve Replacement)
('2024-09-16', 'Normal valve function observed; patient experiencing occasional fatigue.', 'Fatigue', 'Monitor and reduce strenuous activity.', 'Stable', false, 2),
('2024-09-30', 'No major issues, slight chest pain post-op.', 'Chest pain', 'Prescribe low-dose painkillers.', 'Improving', false, 2),

-- Follow-ups for Surgery ID 3 (Angioplasty)
('2024-09-17', 'Patient reports no chest pain post-op. Arteries remain open.', 'None', 'Continue with prescribed medication and lifestyle changes.', 'Excellent', true, 3),

-- Follow-ups for Surgery ID 4 (Mitral Valve Repair)
('2024-09-18', 'Mitral valve functioning well, mild arrhythmia noted.', 'Mild arrhythmia', 'Refer to cardiologist for further review.', 'Good', false, 4),
('2024-09-28', 'Patient experienced minor palpitations; advised further monitoring.', 'Palpitations', 'Monitor heart rhythm with Holter study.', 'Fair', false, 4),

-- Follow-ups for Surgery ID 5 (Pacemaker Implantation)
('2024-09-20', 'Pacemaker functioning as expected, no complications.', 'None', 'Continue regular monitoring of heart rate.', 'Excellent', true, 5);

INSERT INTO Medications (Name, Dosage, Frequency, Route, Notes, SurgeryFollowUpId)
VALUES
-- Medications for FollowUp 1 (Coronary Artery Bypass Grafting)
('Aspirin', '81 mg', 'Once daily', 'Oral', 'To prevent blood clots', 1),
('Metoprolol', '25 mg', 'Twice daily', 'Oral', 'For controlling blood pressure', 1),

-- Medications for FollowUp 2 (Aortic Valve Replacement)
('Furosemide', '20 mg', 'Once daily', 'Oral', 'To reduce fluid retention', 2),
('Warfarin', '5 mg', 'Once daily', 'Oral', 'Blood thinner to prevent clotting', 2),

-- Medications for FollowUp 3 (Angioplasty)
('Atorvastatin', '10 mg', 'Once daily', 'Oral', 'To lower cholesterol', 3),
('Clopidogrel', '75 mg', 'Once daily', 'Oral', 'Antiplatelet to prevent clotting', 3),

-- Medications for FollowUp 4 (Mitral Valve Repair)
('Amiodarone', '200 mg', 'Once daily', 'Oral', 'For arrhythmia management', 4),
('Lisinopril', '10 mg', 'Once daily', 'Oral', 'For blood pressure control', 4),

-- Medications for FollowUp 5 (Pacemaker Implantation)
('Lidocaine', '50 mg', 'As needed', 'Intravenous', 'For pain management', 5),
('Enalapril', '5 mg', 'Once daily', 'Oral', 'To control high blood pressure', 5);

INSERT INTO Prescriptions (Date, MedicationName, Dosage, Frequency, Route, Notes, PatientId)
VALUES
('2024-01-05', 'Aspirin', '100 mg', 'Once daily', 'Oral', 'For heart disease prevention', 1),
('2024-02-12', 'Metformin', '500 mg', 'Twice daily', 'Oral', 'For blood sugar control', 2),
('2024-02-15', 'Losartan', '50 mg', 'Once daily', 'Oral', 'For hypertension', 2),
('2024-03-08', 'Atorvastatin', '20 mg', 'Once daily', 'Oral', 'To lower cholesterol', 3),
('2024-04-03', 'Lisinopril', '10 mg', 'Once daily', 'Oral', 'For blood pressure', 4),
('2024-04-07', 'Furosemide', '40 mg', 'Once daily', 'Oral', 'For fluid retention', 4),
('2024-05-22', 'Warfarin', '2 mg', 'Once daily', 'Oral', 'To prevent blood clots', 5),
('2024-06-15', 'Simvastatin', '20 mg', 'Once daily', 'Oral', 'For cholesterol control', 6),
('2024-06-20', 'Metoprolol', '50 mg', 'Twice daily', 'Oral', 'To manage high blood pressure', 6),
('2024-07-11', 'Amlodipine', '5 mg', 'Once daily', 'Oral', 'For hypertension', 7),
('2024-08-02', 'Levothyroxine', '75 mcg', 'Once daily', 'Oral', 'For thyroid hormone replacement', 8),
('2024-08-10', 'Clopidogrel', '75 mg', 'Once daily', 'Oral', 'To prevent stroke', 8),
('2024-09-05', 'Carvedilol', '6.25 mg', 'Twice daily', 'Oral', 'For heart failure', 9),
('2024-10-18', 'Insulin Glargine', '10 units', 'Once daily', 'Subcutaneous', 'Long-acting insulin', 10),
('2024-10-21', 'Dapagliflozin', '5 mg', 'Once daily', 'Oral', 'For diabetes management', 10),
('2024-11-09', 'Hydrochlorothiazide', '25 mg', 'Once daily', 'Oral', 'For edema control', 11),
('2024-12-14', 'Rosuvastatin', '10 mg', 'Once daily', 'Oral', 'For cholesterol management', 12),
('2024-12-20', 'Enalapril', '5 mg', 'Once daily', 'Oral', 'For hypertension', 12),
('2024-01-02', 'Budesonide', '200 mcg', 'Twice daily', 'Inhalation', 'For asthma control', 13),
('2024-02-17', 'Tamsulosin', '0.4 mg', 'Once daily', 'Oral', 'For BPH management', 14),
('2024-02-20', 'Finasteride', '5 mg', 'Once daily', 'Oral', 'For prostate enlargement', 14),
('2024-03-22', 'Digoxin', '0.25 mg', 'Once daily', 'Oral', 'For atrial fibrillation', 15),
('2024-04-11', 'Methotrexate', '15 mg', 'Once weekly', 'Oral', 'For rheumatoid arthritis', 16),
('2024-04-18', 'Folic Acid', '1 mg', 'Once daily', 'Oral', 'To reduce side effects of methotrexate', 16),
('2024-05-25', 'Gabapentin', '300 mg', 'Twice daily', 'Oral', 'For neuropathic pain', 17),
('2024-06-19', 'Spironolactone', '25 mg', 'Once daily', 'Oral', 'For heart failure', 18),
('2024-06-22', 'Eplerenone', '50 mg', 'Once daily', 'Oral', 'For heart failure management', 18);

INSERT INTO NoteStatuses (NoteStatusName)
VALUES
('Draft'),
('In Progress'),
('Completed'),
('Archived');

INSERT INTO Notes (AppUserId, Title, Content, Date, NoteStatusId)
VALUES
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Meeting with the Dev Team', 'Discussed the sprint planning and task assignments.', '2024-09-01', 1),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'UI Design Review', 'Reviewed the new wireframes for the dashboard.', '2024-09-02', 2),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Code Refactoring', 'Refactored the authentication module.', '2024-09-03', 3),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Product Feedback', 'Collected feedback from beta testers.', '2024-09-04', 4),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Project Deadlines', 'Updated deadlines for the next sprint cycle.', '2024-09-05', 1),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Marketing Strategy', 'Brainstormed ideas for the next campaign.', '2024-09-06', 2),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'Client Feedback Meeting', 'Reviewed client feedback for feature requests.', '2024-09-07', 3),
('73ef92c8-6811-4953-83c1-e32379839b2e', 'API Performance Improvements', 'Worked on optimizing API calls.', '2024-09-08', 4);

INSERT INTO Notes (AppUserId, Title, Content, Date, NoteStatusId)
VALUES
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Diet Plan', 'Set up a new diet plan for the week.', '2024-09-01', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Grocery Shopping List', 'Created a list for this week’s groceries.', '2024-09-02', 2),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Gym Routine', 'Outlined a new workout routine.', '2024-09-03', 3),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Running Goals', 'Set personal running goals for the next month.', '2024-09-04', 4),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Vacation Planning', 'Researched vacation destinations.', '2024-09-05', 1),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Personal Development', 'Listed books and courses for self-development.', '2024-09-06', 2),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Meditation Techniques', 'Collected resources for meditation practices.', '2024-09-07', 3),
('5dc76f07-b5b3-4428-b2e7-c387da6a75ed', 'Weekend Activities', 'Planned outdoor activities for the weekend.', '2024-09-08', 4);

INSERT INTO Notes (AppUserId, Title, Content, Date, NoteStatusId)
VALUES
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Book List', 'Compiled a list of books to read this year.', '2024-09-01', 1),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Cooking Recipe Ideas', 'Tried new recipes for healthy meals.', '2024-09-02', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Travel Bucket List', 'Noted down places to visit.', '2024-09-03', 3),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Photography Projects', 'Brainstormed ideas for photography projects.', '2024-09-04', 4),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Music Playlist', 'Created a new playlist for work.', '2024-09-05', 1),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Game Night', 'Planned a game night with friends.', '2024-09-06', 2),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Personal Budget', 'Updated personal finance budget.', '2024-09-07', 3),
('15b22b08-ee3a-40ac-96d2-011a707d60b9', 'Weekend Trip', 'Researched destinations for a quick weekend trip.', '2024-09-08', 4);
