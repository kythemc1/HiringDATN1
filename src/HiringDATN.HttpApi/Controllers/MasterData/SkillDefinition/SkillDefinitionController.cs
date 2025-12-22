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
[Route("api/SkillDefinition")]
public class SkillDefinitionController(ISkillDefinitionAppService SkillDefinitionAppService) : AdministrationController
{
    private readonly ISkillDefinitionAppService _SkillDefinitionAppService = SkillDefinitionAppService;

    [HttpGet]
    public async Task<SkillDefinitionDto> GetByIdAsync(long id)
    {
        return await _SkillDefinitionAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<SkillDefinitionDto>> SearchAsync(SearchInputDto input)
    {
        return await _SkillDefinitionAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<SkillDefinitionDto> CreateAsync(CreateUpdateSkillDefinitionDto input)
    {
        return await _SkillDefinitionAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<SkillDefinitionDto> UpdateAsync(long id, CreateUpdateSkillDefinitionDto input)
    {
        return await _SkillDefinitionAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _SkillDefinitionAppService.DeleteAsync(id);
    }
}
