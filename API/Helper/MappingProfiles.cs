using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Dtos.HolterStudyDtos;
using Core.Dtos.Identity;
using Core.DTOs;
using Core.Entities;
using Core.Entities.HolterStudyInfo;
using Core.Entities.Identity;

namespace API.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            CreateMap<AppUser, UserDto>()
            .ForMember(d => d.Photos, o => o.MapFrom(s => s.Photo.Url));
            CreateMap<Patient, PatientDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.PatientStatus.PatientStatusName));


            CreateMap<Appointment, AppointmentDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName))
            .ForMember(d => d.PatientEmail, o => o.MapFrom(s => s.Patient.Email))
            .ForMember(d => d.PatientPhone, o => o.MapFrom(s => s.Patient.Phone))
            .ForMember(d => d.PatientAddress, o => o.MapFrom(s => s.Patient.Address))
            .ForMember(d => d.UserDoctor, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.AppointmentStatus, o => o.MapFrom(s => s.AppointmentStatus.AppointmentStatusName))
            .ForMember(d => d.AppointmentType, o => o.MapFrom(s => s.AppointmentType.Name));

            CreateMap<AppointmentType, AppointmentTypeDto>();
            CreateMap<AppointmentStatus, AppointmentStatusDto>();

            CreateMap<BloodTest, BloodTestDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<CardiacCatheterizationStudy, CardiacCatheterizationStudyDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<Diagnostic, DiagnosticDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<DiseaseHistory, DiseaseHistoryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName))
            .ForMember(d => d.Attachments, o => o.MapFrom(s => s.Attachments));

            CreateMap<Attachment, AttachmentDto>();

            CreateMap<Echocardiogram, EchocardiogramDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<Electrocardiogram, ElectrocardiogramDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<HolterStudy, HolterStudyDto>()
                .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName))
                .ForMember(d => d.ArrhythmiaEvents, o => o.MapFrom(s => s.ArrhythmiaEvents))
                .ForMember(d => d.MedicationAdministrations, o => o.MapFrom(s => s.MedicationAdministrations))
                .ForMember(d => d.PatientSymptoms, o => o.MapFrom(s => s.PatientSymptoms))
                .ForMember(d => d.ClinicalEvaluations, o => o.MapFrom(s => s.ClinicalEvaluations))
                .ForMember(d => d.AdditionalTestResults, o => o.MapFrom(s => s.AdditionalTestResults));

            CreateMap<MedicalHistory, MedicalHistoryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<PhysicalExamination, PhysicalExaminationDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<StressTest, StressTestDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<Treatment, TreatmentDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<CardiologySurgery, CardiologySurgeryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<SurgeryFollowUp, SurgeryFollowUpDto>()
                .ForMember(d => d.Medications, o => o.MapFrom(s => s.MedicationsPrescribed));


            CreateMap<Medication, MedicationDto>();


            CreateMap<Notes, NotesDto>()
            .ForMember(d => d.NoteStatus, o => o.MapFrom(s => s.NoteStatus.NoteStatusName));

            CreateMap<NoteStatus, NoteStatusDto>();

            CreateMap<Prescription, PrescriptionDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<ArrhythmiaEvent, ArrhythmiaEventDto>();
            CreateMap<MedicationAdministration, MedicationAdministrationDto>();
            CreateMap<PatientSymptom, PatientSymptomDto>();
            CreateMap<ClinicalEvaluation, ClinicalEvaluationDto>();
            CreateMap<AdditionalTestResult, AdditionalTestResultDto>();

            // CreateMap<Photo, PhotoDto>();
            // .ForMember(d => d.PictureUrl, o => o.MapFrom<PhotoUrlResolver>());

            // Create
            CreateMap<PatientCreateDto, Patient>();
            CreateMap<AppointmentCreateDto, Appointment>();
            CreateMap<AppointmentTypeCreateDto, AppointmentType>();
            CreateMap<AppointmentStatusCreateDto, AppointmentStatus>();
            CreateMap<BloodTestCreateDto, BloodTest>();
            CreateMap<NoteCreateDto, Notes>();
            CreateMap<CardiacCathStudyCreateDto, CardiacCatheterizationStudy>();
            CreateMap<DiagnosticCreateDto, Diagnostic>();
            CreateMap<DiseaseHistoryCreateDto, DiseaseHistory>();
            CreateMap<EchocardiogramCreateDto, Echocardiogram>();
            CreateMap<ElectrocardiogramCreateDto, Electrocardiogram>();
            CreateMap<HolterStudyCreateDto, HolterStudy>();
            CreateMap<ArrhythmiaEventCreateDto, ArrhythmiaEvent>();
            CreateMap<MedicationAdministrationCreateDto, MedicationAdministration>();
            CreateMap<ClinicalEvaluationCreateDto, ClinicalEvaluation>();
            CreateMap<AdditionalTestResultCreateDto, AdditionalTestResult>();
            CreateMap<PatientSymptomCreateDto, PatientSymptom>();
            CreateMap<MedicalHistoryCreateDto, MedicalHistory>();
            CreateMap<PhysicalExaminationCreateDto, PhysicalExamination>();
            CreateMap<StressTestCreateDto, StressTest>();
            CreateMap<SurgeryFollowUpsCreateDto, SurgeryFollowUp>();
            CreateMap<MedicationCreateDto, Medication>();
            CreateMap<TreatmentCreateDto, Treatment>();
            CreateMap<CardiologySurgeryCreateDto, CardiologySurgery>();
            CreateMap<NoteStatusCreateDto, NoteStatus>();
            CreateMap<PatientStatusCreateDto, PatientStatus>();
        }
    }
}