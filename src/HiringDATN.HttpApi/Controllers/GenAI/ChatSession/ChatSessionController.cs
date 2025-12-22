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
[Route("api/ChatSession")]
public class ChatSessionController(IChatSessionAppService ChatSessionAppService) : AdministrationController
{
    private readonly IChatSessionAppService _ChatSessionAppService = ChatSessionAppService;

    [HttpGet]
    public async Task<ChatSessionDto> GetByIdAsync(long id)
    {
        return await _ChatSessionAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<ChatSessionDto>> SearchAsync(SearchInputDto input)
    {
        return await _ChatSessionAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<ChatSessionDto> CreateAsync(CreateUpdateChatSessionDto input)
    {
        return await _ChatSessionAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<ChatSessionDto> UpdateAsync(long id, CreateUpdateChatSessionDto input)
    {
        return await _ChatSessionAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _ChatSessionAppService.DeleteAsync(id);
    }
}
