using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using HiringDATN.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/AiModelConfig")]
public class AiModelConfigController(IAiModelConfigAppService aiModelConfigAppService) : AdministrationController
{
    private readonly IAiModelConfigAppService _aiModelConfigAppService = aiModelConfigAppService;

    [HttpGet]
    public async Task<AiModelConfigDto> GetByIdAsync(long id)
    {
        return await _aiModelConfigAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<AiModelConfigDto>> SearchAsync(SearchInputDto input)
    {
        return await _aiModelConfigAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<AiModelConfigDto> CreateAsync(CreateUpdateAiModelConfigDto input)
    {
        return await _aiModelConfigAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<AiModelConfigDto> UpdateAsync(long id, CreateUpdateAiModelConfigDto input)
    {
        return await _aiModelConfigAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _aiModelConfigAppService.DeleteAsync(id);
    }
}
