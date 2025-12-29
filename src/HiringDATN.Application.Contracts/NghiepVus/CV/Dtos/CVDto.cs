using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiringDATN.Dtos;

public class CVDto
{
    public CandidateProfileDto CandidateProfileDto { get; set; }
    public List<CandidateCertificateDto> CandidateCertificateDtos { get; set; }
    public List<CandidateEducationDto> CandidateEducationDtos { get; set; }
    public List<CandidateExperienceDto> CandidateExperienceDtos { get; set; }
    public List<CandidateSkillDto> CandidateSkillDtos { get; set; }
    public List<CandidateProjectDto> CandidateProjectDtos { get; set; }
}
