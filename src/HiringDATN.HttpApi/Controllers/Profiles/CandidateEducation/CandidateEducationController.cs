using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using HiringDATN.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/CandidateEducation")]
public class CandidateEducationController(ICandidateEducationAppService CandidateEducationAppService) : AdministrationController
{
    private readonly ICandidateEducationAppService _CandidateEducationAppService = CandidateEducationAppService;

    [HttpGet]
    public async Task<CandidateEducationDto> GetByIdAsync(long id)
    {
        return await _CandidateEducationAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CandidateEducationDto>> SearchAsync(SearchInputDto input)
    {
        return await _CandidateEducationAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CandidateEducationDto> CreateAsync(CreateUpdateCandidateEducationDto input)
    {
        return await _CandidateEducationAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CandidateEducationDto> UpdateAsync(long id, CreateUpdateCandidateEducationDto input)
    {
        return await _CandidateEducationAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CandidateEducationAppService.DeleteAsync(id);
    }
}
