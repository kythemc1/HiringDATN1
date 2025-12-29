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
[Route("api/CVController")]
public class CVController(ICVAppService CVAppService) : AdministrationController
{
    private readonly ICVAppService _CVAppService = CVAppService;

    [HttpGet]
    public async Task<CVDto> GetAsync(long id)
    {
        return await _CVAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CVDto>> GetListAsync(SearchInputDto input)
    {
        return await _CVAppService.GetListAsync(input);
    }

    [HttpPost("Create")]
    public async Task<CVDto> CreateAsync([FromBody] CreateUpdateCVDto input)
    {
        return await _CVAppService.CreateAsync(input);
    }

    [HttpDelete("delete")]
    public async Task DeleteAsync(long id)
    {
        await _CVAppService.DeleteAsync(id);
    }
}
