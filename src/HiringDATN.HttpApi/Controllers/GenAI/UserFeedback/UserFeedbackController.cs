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
[Route("api/UserFeedback")]
public class UserFeedbackController(IUserFeedbackAppService UserFeedbackAppService) : AdministrationController
{
    private readonly IUserFeedbackAppService _UserFeedbackAppService = UserFeedbackAppService;

    [HttpGet]
    public async Task<UserFeedbackDto> GetByIdAsync(long id)
    {
        return await _UserFeedbackAppService.GetAsync(id);
    }

    [HttpPost("search")]
    public async Task<PagedResultDto<UserFeedbackDto>> SearchAsync(SearchInputDto input)
    {
        return await _UserFeedbackAppService.GetListAsync(input);
    }


    [HttpPost]
    public async Task<UserFeedbackDto> CreateAsync(CreateUpdateUserFeedbackDto input)
    {
        return await _UserFeedbackAppService.CreateAsync(input);
    }

    [HttpPut]
    public async Task<UserFeedbackDto> UpdateAsync(long id, CreateUpdateUserFeedbackDto input)
    {
        return await _UserFeedbackAppService.UpdateAsync(id, input);
    }

    [HttpDelete()]
    public async Task DeleteAsync(long id)
    {
        await _UserFeedbackAppService.DeleteAsync(id);
    }
}
