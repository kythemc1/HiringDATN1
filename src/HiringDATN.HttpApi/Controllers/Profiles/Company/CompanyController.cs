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
[Route("api/Company")]
public class CompanyController(ICompanyAppService CompanyAppService) : AdministrationController
{
    private readonly ICompanyAppService _CompanyAppService = CompanyAppService;

    [HttpGet]
    public async Task<CompanyDto> GetByIdAsync(long id)
    {
        return await _CompanyAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CompanyDto>> SearchAsync(SearchInputDto input)
    {
        return await _CompanyAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CompanyDto> CreateAsync(CreateUpdateCompanyDto input)
    {
        return await _CompanyAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CompanyDto> UpdateAsync(long id, CreateUpdateCompanyDto input)
    {
        return await _CompanyAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CompanyAppService.DeleteAsync(id);
    }
}
