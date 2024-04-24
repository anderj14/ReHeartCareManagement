using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class EchocardiogramSpecification : BaseSpecification<Echocardiogram>
    {
        public EchocardiogramSpecification(int patientId)
            :base(e => e.PatientId == patientId)
        {
            AddInclude(e => e.Patient);
        }

        public EchocardiogramSpecification(int patientId, int echocardiogramId)
            :base(e => e.PatientId == patientId && e.Id == echocardiogramId)
        {
            AddInclude(e => e.Patient);
        }
    }
}