using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiringDATN.Dtos;

public class CreateUpdateCVDto
{
    public CreateUpdateCandidateProfileDto CreateUpdateCandidateProfileDto { get; set; }
    public List<CreateUpdateCandidateCertificateDto> CreateUpdateCandidateCertificateDtos { get; set; }
    public List<CreateUpdateCandidateEducationDto> CreateUpdateCandidateEducationDtos { get; set; }
    public List<CreateUpdateCandidateExperienceDto> CreateUpdateCandidateExperienceDtos { get; set; }
    public List<CreateUpdateCandidateSkillDto> CreateUpdateCandidateSkillDtos { get; set; }
    public List<CreateUpdateCandidateProjectDto> CreateUpdateCandidateProjectDtos { get; set; }
}
