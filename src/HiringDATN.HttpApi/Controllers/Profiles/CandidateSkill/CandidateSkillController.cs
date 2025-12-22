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
[Route("api/CandidateSkill")]
public class CandidateSkillController(ICandidateSkillAppService CandidateSkillAppService) : AdministrationController
{
    private readonly ICandidateSkillAppService _CandidateSkillAppService = CandidateSkillAppService;

    [HttpGet]
    public async Task<CandidateSkillDto> GetByIdAsync(long id)
    {
        return await _CandidateSkillAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CandidateSkillDto>> SearchAsync(SearchInputDto input)
    {
        return await _CandidateSkillAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CandidateSkillDto> CreateAsync(CreateUpdateCandidateSkillDto input)
    {
        return await _CandidateSkillAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CandidateSkillDto> UpdateAsync(long id, CreateUpdateCandidateSkillDto input)
    {
        return await _CandidateSkillAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CandidateSkillAppService.DeleteAsync(id);
    }
}
