using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class TreatmentSpecification : BaseSpecification<Treatment>
    {
        public TreatmentSpecification(int patientId, int treatmentId)
            : base(a => a.PatientId == patientId && a.Id == treatmentId)
        {
            AddInclude(a => a.Patient);
        }

        public TreatmentSpecification(int patientId)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
        }
    }
}