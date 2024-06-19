using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.HolterStudyInfo;

namespace API.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Patient, PatientDto>()
            .ForMember(p => p.Appointments, o => o.MapFrom(s => s.Appointments))
            .ForMember(p => p.BloodTests, o => o.MapFrom(s => s.BloodTests))
            .ForMember(p => p.CardiacCatheterizationStudies, o => o.MapFrom(s => s.CardiacCatheterizationStudies))
            .ForMember(p => p.Diagnostics, o => o.MapFrom(s => s.Diagnostics))
            .ForMember(p => p.DiseaseHistories, o => o.MapFrom(s => s.DiseaseHistories))
            .ForMember(p => p.Echocardiograms, o => o.MapFrom(s => s.Echocardiograms))
            .ForMember(p => p.Electrocardiograms, o => o.MapFrom(s => s.Electrocardiograms))
            .ForMember(p => p.HolterStudies, o => o.MapFrom(s => s.HolterStudies))
            .ForMember(p => p.MedicalHistories, o => o.MapFrom(s => s.MedicalHistories))
            .ForMember(p => p.PhysicalExaminations, o => o.MapFrom(s => s.PhysicalExaminations))
            .ForMember(p => p.StressTests, o => o.MapFrom(s => s.StressTests))
            .ForMember(p => p.Treatments, o => o.MapFrom(s => s.Treatments))
            .ForMember(p => p.CardiologySurgeries, o => o.MapFrom(s => s.CardiologySurgery));

            CreateMap<Appointment, AppointmentDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName))
            .ForMember(d => d.PatientEmail, o => o.MapFrom(s => s.Patient.Email))
            .ForMember(d => d.PatientPhone, o => o.MapFrom(s => s.Patient.Phone))
            .ForMember(d => d.PatientAddress, o => o.MapFrom(s => s.Patient.Address))
            .ForMember(d => d.UserDoctor, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.AppointmentStatus, o => o.MapFrom(s => s.AppointmentStatus.AppointmentStatusName));
            CreateMap<BloodTest, BloodTestDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<CardiacCatheterizationStudy, CardiacCatheterizationStudyDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<Diagnostic, DiagnosticDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<DiseaseHistory, DiseaseHistoryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<Echocardiogram, EchocardiogramDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<Electrocardiogram, ElectrocardiogramDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<HolterStudy, HolterStudyDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<MedicalHistory, MedicalHistoryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<PhysicalExamination, PhysicalExaminationDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            // .ForMember(d => d.ImageEcoUrl, o => o.MapFrom<PhysicalExaminationEcoImageUrlResolver>())
            // .ForMember(d => d.ImageStresUrl, o => o.MapFrom<PhysicalExaminationStressImageUrlResolver>());
            CreateMap<StressTest, StressTestDto>();
            CreateMap<Treatment, TreatmentDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<CardiologySurgery, CardiologySurgeryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            CreateMap<SurgeryFollowUp, SurgeryFollowUpDto>()
            .ForMember(d => d.CardiologySurgery, o => o.MapFrom(s => s.CardiologySurgery.SurgeryName));
            CreateMap<Notes, NotesDto>();
            // .ForMember(d => d.NoteStatus, o => o.MapFrom(s => s.NoteStatus.NoteStatusName));
            // CreateMap<NoteStatus, NoteStatusDto>();

            CreateMap<Photo, PhotoDto>();
            // .ForMember(d => d.PictureUrl, o => o.MapFrom<PhotoUrlResolver>());

            // Create
            CreateMap<AppointmentStatus, AppointmentStatusDto>();
            CreateMap<PatientCreateDto, Patient>();
            CreateMap<AppointmentCreateDto, Appointment>();
            CreateMap<BloodTestCreateDto, BloodTest>();
            CreateMap<NoteCreateDto, Notes>();
            CreateMap<AppointmentStatusCreateDto, AppointmentStatus>();
            CreateMap<CardiacCathStudyCreateDto, CardiacCatheterizationStudy>();
            CreateMap<DiagnosticCreateDto, Diagnostic>();
            CreateMap<DiseaseHistoryCreateDto, DiseaseHistory>();
            CreateMap<EchocardiogramCreateDto, Echocardiogram>();
            CreateMap<ElectrocardiogramCreateDto, Electrocardiogram>();
            CreateMap<HolterStudyCreateDto, HolterStudy>();
            CreateMap<MedicalHistoryCreateDto, MedicalHistory>();
            CreateMap<PhysicalExaminationCreateDto, PhysicalExamination>();
            CreateMap<StressTestCreateDto, StressTest>();
            CreateMap<SurgeryFollowUpsCreateDto, SurgeryFollowUp>();
            CreateMap<TreatmentCreateDto, Treatment>();
        }
    }
}