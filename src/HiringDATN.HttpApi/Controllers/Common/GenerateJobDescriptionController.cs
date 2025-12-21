using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Service;
using HiringDATN.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/GenerateJobDescription")]

public class GenerateJobDescriptionController(JobDescriptionAppService jobDescriptionAppService) : AdministrationController
{
    private readonly JobDescriptionAppService _jobDescriptionAppService = jobDescriptionAppService;

    [HttpGet("mo-ta-cong-viec")]
    public async Task<string> GenerateJobDescriptionAsync(string jobTitle, string specificRequirements)
    {
        return await _jobDescriptionAppService.GenerateJobDescriptionAsync(jobTitle, specificRequirements);
    }

}
