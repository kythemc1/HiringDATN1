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
[Route("api/CandidateExperience")]
public class CandidateExperienceController(ICandidateExperienceAppService CandidateExperienceAppService) : AdministrationController
{
    private readonly ICandidateExperienceAppService _CandidateExperienceAppService = CandidateExperienceAppService;

    [HttpGet]
    public async Task<CandidateExperienceDto> GetByIdAsync(long id)
    {
        return await _CandidateExperienceAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CandidateExperienceDto>> SearchAsync(SearchInputDto input)
    {
        return await _CandidateExperienceAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CandidateExperienceDto> CreateAsync(CreateUpdateCandidateExperienceDto input)
    {
        return await _CandidateExperienceAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CandidateExperienceDto> UpdateAsync(long id, CreateUpdateCandidateExperienceDto input)
    {
        return await _CandidateExperienceAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CandidateExperienceAppService.DeleteAsync(id);
    }
}
