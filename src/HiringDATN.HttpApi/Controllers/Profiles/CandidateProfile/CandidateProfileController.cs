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
[Route("api/CandidateProfile")]
public class CandidateProfileController(ICandidateProfileAppService CandidateProfileAppService) : AdministrationController
{
    private readonly ICandidateProfileAppService _CandidateProfileAppService = CandidateProfileAppService;

    [HttpGet]
    public async Task<CandidateProfileDto> GetByIdAsync(long id)
    {
        return await _CandidateProfileAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CandidateProfileDto>> SearchAsync(SearchInputDto input)
    {
        return await _CandidateProfileAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CandidateProfileDto> CreateAsync(CreateUpdateCandidateProfileDto input)
    {
        return await _CandidateProfileAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CandidateProfileDto> UpdateAsync(long id, CreateUpdateCandidateProfileDto input)
    {
        return await _CandidateProfileAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CandidateProfileAppService.DeleteAsync(id);
    }
}
