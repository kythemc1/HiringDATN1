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
[Route("api/JobApplication")]
public class JobApplicationController(IJobApplicationAppService JobApplicationAppService) : AdministrationController
{
    private readonly IJobApplicationAppService _JobApplicationAppService = JobApplicationAppService;

    [HttpGet]
    public async Task<JobApplicationDto> GetByIdAsync(long id)
    {
        return await _JobApplicationAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<JobApplicationDto>> SearchAsync(SearchInputDto input)
    {
        return await _JobApplicationAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<JobApplicationDto> CreateAsync(CreateUpdateJobApplicationDto input)
    {
        return await _JobApplicationAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<JobApplicationDto> UpdateAsync(long id, CreateUpdateJobApplicationDto input)
    {
        return await _JobApplicationAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _JobApplicationAppService.DeleteAsync(id);
    }

    [HttpGet("status-chart")]
    public async Task<List<SimpleChartDto>> GetCountByStatusAsync()
    {
        return await _JobApplicationAppService.GetCountByStatusAsync();
    }

    [HttpGet("trend-chart")]
    public async Task<List<SimpleChartDto>> GetApplicationTrendAsync()
    {
        return await _JobApplicationAppService.GetApplicationTrendAsync();
    }
}
