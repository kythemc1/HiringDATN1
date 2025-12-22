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
[Route("api/AiPromptTemplate")]
public class AiPromptTemplateController(IAiPromptTemplateAppService AiPromptTemplateAppService) : AdministrationController
{
    private readonly IAiPromptTemplateAppService _AiPromptTemplateAppService = AiPromptTemplateAppService;

    [HttpGet]
    public async Task<AiPromptTemplateDto> GetByIdAsync(long id)
    {
        return await _AiPromptTemplateAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<AiPromptTemplateDto>> SearchAsync(SearchInputDto input)
    {
        return await _AiPromptTemplateAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<AiPromptTemplateDto> CreateAsync(CreateUpdateAiPromptTemplateDto input)
    {
        return await _AiPromptTemplateAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<AiPromptTemplateDto> UpdateAsync(long id, CreateUpdateAiPromptTemplateDto input)
    {
        return await _AiPromptTemplateAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _AiPromptTemplateAppService.DeleteAsync(id);
    }
}
