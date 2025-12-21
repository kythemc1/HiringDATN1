using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiringDATN.Dtos;

// Input cho phần Kinh nghiệm làm việc
public class OptimizeWorkExperienceInputDto
{
    public string JobTitle { get; set; } // VD: Backend Developer
    public string CompanyName { get; set; } // VD: FPT Software
    public string RawDescription { get; set; } // Những gạch đầu dòng thô sơ của user
}

// Input cho phần Mục tiêu nghề nghiệp
public class GenerateObjectiveInputDto
{
    public string CurrentRole { get; set; } // VD: Sinh viên mới ra trường
    public string TargetCompanyName { get; set; } // VD: VinGroup
    public string TargetJobTitle { get; set; } // VD: AI Engineer
    public int YearsOfExperience { get; set; }
}