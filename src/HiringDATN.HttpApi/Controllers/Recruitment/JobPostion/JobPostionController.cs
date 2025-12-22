//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using HiringDATN.Dtos;
//using HiringDATN.Interfaces;
//using HiringDATN.Service;
//using Microsoft.AspNetCore.Mvc;
//using Volo.Abp.Application.Dtos;

//namespace HiringDATN.Controllers;

//[Area("HiringDATN")]
//[Route("api/JobPostionRecruitment")]
//public class JobPostionRecruitmentController(IJobPostionAppService JobPostionRecruitmentAppService) : AdministrationController
//{
//    private readonly IJobPostionRecruitmentAppService _JobPostionRecruitmentAppService = JobPostionRecruitmentAppService;

//    [HttpGet]
//    public async Task<JobPostionRecruitmentDto> GetByIdAsync(long id)
//    {
//        return await _JobPostionRecruitmentAppService.GetAsync(id);
//    }

//    [HttpPost("search")]
//    public async Task<PagedResultDto<JobPostionRecruitmentDto>> SearchAsync(SearchInputDto input)
//    {
//        return await _JobPostionRecruitmentAppService.GetListAsync(input);
//    }


//    [HttpPost]
//    public async Task<JobPostionRecruitmentDto> CreateAsync(CreateUpdateJobPostionRecruitmentDto input)
//    {
//        return await _JobPostionRecruitmentAppService.CreateAsync(input);
//    }

//    [HttpPut]
//    public async Task<JobPostionRecruitmentDto> UpdateAsync(long id, CreateUpdateJobPostionRecruitmentDto input)
//    {
//        return await _JobPostionRecruitmentAppService.UpdateAsync(id, input);
//    }

//    [HttpDelete()]
//    public async Task DeleteAsync(long id)
//    {
//        await _JobPostionRecruitmentAppService.DeleteAsync(id);
//    }
//}
