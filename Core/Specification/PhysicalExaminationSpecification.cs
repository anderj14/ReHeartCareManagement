using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class PhysicalExaminationSpecification : BaseSpecification<PhysicalExamination>
    {
        public PhysicalExaminationSpecification(int patientId, int physicalExaminationId)
           :base(a => a.PatientId == patientId && a.Id == physicalExaminationId)
        {
            AddInclude(a => a.Patient);
        }

        public PhysicalExaminationSpecification(int patientId)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
        }
    }
}