using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class StressTestSpecification : BaseSpecification<StressTest>
    {
        public StressTestSpecification(int patientId, int stressTestId)
            : base(a => a.PatientId == patientId && a.Id == stressTestId)
        {
            AddInclude(a => a.Patient);
        }

        public StressTestSpecification(int patientId)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
        }
    }
}