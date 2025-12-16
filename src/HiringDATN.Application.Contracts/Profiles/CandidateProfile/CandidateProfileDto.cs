using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CandidateProfileDto : AuditedEntityDto<long?>
{
    public long UserId { get; set; }
    public string? FullName { get; set; }
    public string? JobTitle { get; set; }
    public string? AboutMe { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? GithubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
}

public class CreateUpdateCandidateProfileDto : AuditedEntityDto<long?>
{
    public long UserId { get; set; }
    public string? FullName { get; set; }
    public string? JobTitle { get; set; }
    public string? AboutMe { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? GithubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
}