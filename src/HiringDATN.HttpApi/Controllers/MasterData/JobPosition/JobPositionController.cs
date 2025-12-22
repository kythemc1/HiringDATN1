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
[Route("api/JobPosition")]
public class JobPositionController(IJobPositionAppService JobPositionAppService) : AdministrationController
{
    private readonly IJobPositionAppService _JobPositionAppService = JobPositionAppService;

    [HttpGet]
    public async Task<JobPositionDto> GetByIdAsync(long id)
    {
        return await _JobPositionAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<JobPositionDto>> SearchAsync(SearchInputDto input)
    {
        return await _JobPositionAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<JobPositionDto> CreateAsync(CreateUpdateJobPositionDto input)
    {
        return await _JobPositionAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<JobPositionDto> UpdateAsync(long id, CreateUpdateJobPositionDto input)
    {
        return await _JobPositionAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _JobPositionAppService.DeleteAsync(id);
    }
}
