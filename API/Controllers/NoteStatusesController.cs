// using AutoMapper;
// using Core.Dtos;
// using Core.Entities;
// using Core.Interfaces;
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers
// {
//     public class NoteStatusesController : BaseApiController
//     {
//         private readonly IMapper _mapper;
//         private readonly IUnitOfWork _unitOfWork;

//         public NoteStatusesController(IMapper mapper, IUnitOfWork unitOfWork)
//         {
//             _unitOfWork = unitOfWork;
//             _mapper = mapper;
//         }

//         [HttpGet]
//         public async Task<ActionResult<IReadOnlyList<NoteStatusDto>>> GetNoteStatuses()
//         {
//             var statuses = await _unitOfWork.Repository<NoteStatus>().ListAllAsync();
//             var data = _mapper.Map<IReadOnlyList<NoteStatusDto>>(statuses);

//             return Ok(data);
//         }

//         [HttpGet("{id}")]
//         public async Task<ActionResult<NoteStatusDto>> GetNoteStatus(int id)
//         {
//             var status = await _unitOfWork.Repository<NoteStatus>().GetByIdAsync(id);
//             var data = _mapper.Map<NoteStatusDto>(status);
//             return Ok(data);
//         }
//     }
// }