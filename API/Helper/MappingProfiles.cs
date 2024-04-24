using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;

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
            .ForMember(d => d.AppointmentStatus, o => o.MapFrom(s => s.AppointmentStatus.AppointmentStatusName));

            CreateMap<BloodTest, BloodTestDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));
            
            CreateMap<CardiacCatheterizationStudy, CardiacCatheterizationStudyDto>();
            CreateMap<Diagnostic, DiagnosticDto>();
            CreateMap<DiseaseHistory, DiseaseHistoryDto>();
            CreateMap<Echocardiogram, EchocardiogramDto>();
            CreateMap<Electrocardiogram, ElectrocardiogramDto>();
            CreateMap<HolterStudy, HolterStudyDto>();
            CreateMap<MedicalHistory, MedicalHistoryDto>();
            CreateMap<PhysicalExamination, PhysicalExaminationDto>();
            CreateMap<StressTest, StressTestDto>();
            CreateMap<Treatment, TreatmentDto>();

            CreateMap<CardiologySurgery, CardiologySurgeryDto>()
            .ForMember(d => d.Patient, o => o.MapFrom(s => s.Patient.PatientName));

            CreateMap<SurgeryFollowUp, SurgeryFollowUpDto>()
            .ForMember(d => d.CardiologySurgery, o => o.MapFrom(s => s.CardiologySurgery.SurgeryName));

            // CreateMap<Notes, NotesDto>();
            // .ForMember(d => d.NoteStatus, o => o.MapFrom(s => s.NoteStatus.NoteStatusName));


            // CreateMap<NoteStatus, NoteStatusDto>();

            CreateMap<AppointmentStatus, AppointmentStatusDto>();

            // Create
            CreateMap<PatientCreateDto, Patient>();
            CreateMap<AppointmentCreateDto, Appointment>();
            CreateMap<BloodTestCreateDto, BloodTest>();
            CreateMap<NoteCreateDto, Notes>();

        }
    }
}