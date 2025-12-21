using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.CvGenerationAppService;
using HiringDATN.Dtos;
using HiringDATN.Service;
using Microsoft.AspNetCore.Mvc;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/CvContent")]

public class CvContentAppController(CvContentAppService cvContentAppService) : AdministrationController
{
    private readonly CvContentAppService _cvContentAppService = cvContentAppService;

    [HttpGet("kinh-nghiem-lam-viec")]
    public async Task<string> OptimizeWorkExperienceAsync(OptimizeWorkExperienceInputDto input)
    {
        return await _cvContentAppService.OptimizeWorkExperienceAsync(input);
    }

    [HttpPost("muc-tieu-nghe-nghiep")]
    public async Task<string> GenerateCareerObjectiveAsync(GenerateObjectiveInputDto input)
    {
        return await _cvContentAppService.GenerateCareerObjectiveAsync(input);
    }
}
