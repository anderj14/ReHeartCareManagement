
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MedicationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MedicationController(
            IUnitOfWork unitOfWork,
            IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<MedicationDto>>> GetMedications()
        {
            var electrocardiograms = await _unitOfWork.Repository<Medication>().ListAllAsync();
            var electrocardiogramsDtos = _mapper.Map<IReadOnlyList<MedicationDto>>(electrocardiograms);

            return Ok(electrocardiogramsDtos);
        }
    }
}