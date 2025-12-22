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
[Route("api/CandidateProject")]
public class CandidateProjectController(ICandidateProjectAppService CandidateProjectAppService) : AdministrationController
{
    private readonly ICandidateProjectAppService _CandidateProjectAppService = CandidateProjectAppService;

    [HttpGet]
    public async Task<CandidateProjectDto> GetByIdAsync(long id)
    {
        return await _CandidateProjectAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CandidateProjectDto>> SearchAsync(SearchInputDto input)
    {
        return await _CandidateProjectAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CandidateProjectDto> CreateAsync(CreateUpdateCandidateProjectDto input)
    {
        return await _CandidateProjectAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CandidateProjectDto> UpdateAsync(long id, CreateUpdateCandidateProjectDto input)
    {
        return await _CandidateProjectAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CandidateProjectAppService.DeleteAsync(id);
    }
}
