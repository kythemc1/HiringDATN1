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
[Route("api/CertificateDefinition")]
public class CertificateDefinitionController(ICertificateDefinitionAppService CertificateDefinitionAppService) : AdministrationController
{
    private readonly ICertificateDefinitionAppService _CertificateDefinitionAppService = CertificateDefinitionAppService;

    [HttpGet]
    public async Task<CertificateDefinitionDto> GetByIdAsync(long id)
    {
        return await _CertificateDefinitionAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CertificateDefinitionDto>> SearchAsync(SearchInputDto input)
    {
        return await _CertificateDefinitionAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CertificateDefinitionDto> CreateAsync(CreateUpdateCertificateDefinitionDto input)
    {
        return await _CertificateDefinitionAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CertificateDefinitionDto> UpdateAsync(long id, CreateUpdateCertificateDefinitionDto input)
    {
        return await _CertificateDefinitionAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CertificateDefinitionAppService.DeleteAsync(id);
    }
}
