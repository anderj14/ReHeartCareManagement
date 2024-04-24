using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class DiagnosticSpecification : BaseSpecification<Diagnostic>
    {
        public DiagnosticSpecification(int patientId)
            : base(d => d.PatientId == patientId)
        {
            AddInclude(d => d.Patient);
        }

        public DiagnosticSpecification(int patientId, int diagnosticId)
            : base(d => d.PatientId == patientId && d.Id == diagnosticId)
        { 
            AddInclude(d => d.Patient);
        }
    }
}