using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class DiseaseHistorySpecification : BaseSpecification<DiseaseHistory>
    {
        public DiseaseHistorySpecification(int patientId)
            : base(dh => dh.PatientId == patientId)
        {
            AddInclude(dh => dh.Patient);
        }

        public DiseaseHistorySpecification(int patientId, int diseaseHistoryId)
            : base(dh => dh.PatientId == patientId && dh.Id == diseaseHistoryId)
        {
            AddInclude(dh => dh.Patient);
        }
    }
}