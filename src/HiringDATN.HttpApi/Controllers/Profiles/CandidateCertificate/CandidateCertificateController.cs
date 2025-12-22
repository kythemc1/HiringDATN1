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
[Route("api/CandidateCertificate")]
public class CandidateCertificateController(ICandidateCertificateAppService CandidateCertificateAppService) : AdministrationController
{
    private readonly ICandidateCertificateAppService _CandidateCertificateAppService = CandidateCertificateAppService;

    [HttpGet]
    public async Task<CandidateCertificateDto> GetByIdAsync(long id)
    {
        return await _CandidateCertificateAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<CandidateCertificateDto>> SearchAsync(SearchInputDto input)
    {
        return await _CandidateCertificateAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<CandidateCertificateDto> CreateAsync(CreateUpdateCandidateCertificateDto input)
    {
        return await _CandidateCertificateAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<CandidateCertificateDto> UpdateAsync(long id, CreateUpdateCandidateCertificateDto input)
    {
        return await _CandidateCertificateAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _CandidateCertificateAppService.DeleteAsync(id);
    }
}
