using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class HolterStudySpecification : BaseSpecification<HolterStudy>
    {
        public HolterStudySpecification(int patientId, int appointmentId)
            : base(a => a.PatientId == patientId && a.Id == appointmentId)
        {
            AddInclude(a => a.Patient);
        }

        public HolterStudySpecification(int patientId)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
        }
    }
}