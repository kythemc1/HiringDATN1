using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using HiringDATN.Interfaces;
using Microsoft.AspNetCore.Mvc;
using HiringDATN.Service;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/CoverLetter")]

public class CoverLetterController(CoverLetterAppService coverLetterAppService) : AdministrationController
{
    private readonly CoverLetterAppService _coverLetterAppService = coverLetterAppService;

    [HttpGet]
    public async Task<string> GenerateCoverLetterAsync(CoverLetterGenerationInputDto input)
    {
        return await _coverLetterAppService.GenerateCoverLetterAsync(input);
    }
}
