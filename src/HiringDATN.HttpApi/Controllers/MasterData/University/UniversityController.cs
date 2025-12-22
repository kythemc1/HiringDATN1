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
[Route("api/University")]
public class UniversityController(IUniversityAppService UniversityAppService) : AdministrationController
{
    private readonly IUniversityAppService _UniversityAppService = UniversityAppService;

    [HttpGet]
    public async Task<UniversityDto> GetByIdAsync(long id)
    {
        return await _UniversityAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<UniversityDto>> SearchAsync(SearchInputDto input)
    {
        return await _UniversityAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<UniversityDto> CreateAsync(CreateUpdateUniversityDto input)
    {
        return await _UniversityAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<UniversityDto> UpdateAsync(long id, CreateUpdateUniversityDto input)
    {
        return await _UniversityAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _UniversityAppService.DeleteAsync(id);
    }
}
