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
[Route("api/AgentThinkingLog")]
public class AgentThinkingLogController(IAgentThinkingLogAppService AgentThinkingLogAppService) : AdministrationController
{
    private readonly IAgentThinkingLogAppService _AgentThinkingLogAppService = AgentThinkingLogAppService;

    [HttpGet]
    public async Task<AgentThinkingLogDto> GetByIdAsync(long id)
    {
        return await _AgentThinkingLogAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<AgentThinkingLogDto>> SearchAsync(SearchInputDto input)
    {
        return await _AgentThinkingLogAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<AgentThinkingLogDto> CreateAsync(CreateUpdateAgentThinkingLogDto input)
    {
        return await _AgentThinkingLogAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<AgentThinkingLogDto> UpdateAsync(long id, CreateUpdateAgentThinkingLogDto input)
    {
        return await _AgentThinkingLogAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _AgentThinkingLogAppService.DeleteAsync(id);
    }
}
