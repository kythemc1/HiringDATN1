using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using HiringDATN.Interfaces;
using HiringDATN.Service;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/JobPostionRecruitment")]
public class JobPostionRecruitmentController(IJobPostingAppService jobPostingAppService) : AdministrationController
{
    private readonly IJobPostingAppService _jobPostingAppService = jobPostingAppService;

    [HttpGet]
    public async Task<JobPostingDto> GetByIdAsync(long id)
    {
        return await _jobPostingAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<JobPostingDto>> SearchAsync(SearchInputDto input)
    {
        return await _jobPostingAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<JobPostingDto> CreateAsync(CreateUpdateJobPostingDto input)
    {
        return await _jobPostingAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<JobPostingDto> UpdateAsync(long id, CreateUpdateJobPostingDto input)
    {
        return await _jobPostingAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _jobPostingAppService.DeleteAsync(id);
    }
}
