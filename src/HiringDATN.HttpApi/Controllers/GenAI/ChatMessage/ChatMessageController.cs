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
[Route("api/ChatMessage")]
public class ChatMessageController(IChatMessageAppService ChatMessageAppService) : AdministrationController
{
    private readonly IChatMessageAppService _ChatMessageAppService = ChatMessageAppService;

    [HttpGet]
    public async Task<ChatMessageDto> GetByIdAsync(long id)
    {
        return await _ChatMessageAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<ChatMessageDto>> SearchAsync(SearchInputDto input)
    {
        return await _ChatMessageAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<ChatMessageDto> CreateAsync(CreateUpdateChatMessageDto input)
    {
        return await _ChatMessageAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<ChatMessageDto> UpdateAsync(long id, CreateUpdateChatMessageDto input)
    {
        return await _ChatMessageAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _ChatMessageAppService.DeleteAsync(id);
    }
}
