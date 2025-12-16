using AutoMapper;
using HiringDATN.Dtos;
using HiringDATN.Extensions;
using HiringDATN.Recruitment;
namespace HiringDATN;


public class HiringDATNApplicationAutoMapperProfile : Profile
{
    public HiringDATNApplicationAutoMapperProfile()
    {
        /* =========================================================
         * 1. MODULE: AI CONFIGS
         * ========================================================= */
        #region AiModelConfigs
        CreateMap<AiModelConfig, AiModelConfigDto>().ReverseMap();
        CreateMap<CreateUpdateAiModelConfigDto, AiModelConfig>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region AiPromptTemplates
        CreateMap<AiPromptTemplate, AiPromptTemplateDto>().ReverseMap();
        CreateMap<CreateUpdateAiPromptTemplateDto, AiPromptTemplate>().IgnoreFullAuditedObjectProperties();
        #endregion

        /* =========================================================
         * 2. MODULE: MASTER DATA
         * ========================================================= */
        #region SkillDefinitions
        CreateMap<SkillDefinition, SkillDefinitionDto>().ReverseMap();
        CreateMap<CreateUpdateSkillDefinitionDto, SkillDefinition>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region JobPositions
        CreateMap<JobPosition, JobPositionDto>().ReverseMap();
        CreateMap<CreateUpdateJobPositionDto, JobPosition>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region Universities
        CreateMap<University, UniversityDto>().ReverseMap();
        CreateMap<CreateUpdateUniversityDto, University>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CertificateDefinitions
        CreateMap<CertificateDefinition, CertificateDefinitionDto>().ReverseMap();
        CreateMap<CreateUpdateCertificateDefinitionDto, CertificateDefinition>().IgnoreFullAuditedObjectProperties();
        #endregion

        /* =========================================================
         * 3. MODULE: PROFILES
         * ========================================================= */
        #region Companies
        CreateMap<Company, CompanyDto>().ReverseMap();
        CreateMap<CreateUpdateCompanyDto, Company>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CandidateProfiles
        CreateMap<CandidateProfile, CandidateProfileDto>().ReverseMap();
        CreateMap<CreateUpdateCandidateProfileDto, CandidateProfile>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CandidateExperiences
        CreateMap<CandidateExperience, CandidateExperienceDto>().ReverseMap();
        CreateMap<CreateUpdateCandidateExperienceDto, CandidateExperience>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CandidateEducations
        CreateMap<CandidateEducation, CandidateEducationDto>().ReverseMap();
        CreateMap<CreateUpdateCandidateEducationDto, CandidateEducation>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CandidateProjects
        CreateMap<CandidateProject, CandidateProjectDto>().ReverseMap();
        CreateMap<CreateUpdateCandidateProjectDto, CandidateProject>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CandidateCertificates
        CreateMap<CandidateCertificate, CandidateCertificateDto>().ReverseMap();
        CreateMap<CreateUpdateCandidateCertificateDto, CandidateCertificate>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region CandidateSkills
        CreateMap<CandidateSkill, CandidateSkillDto>().ReverseMap();
        CreateMap<CreateUpdateCandidateSkillDto, CandidateSkill>().IgnoreFullAuditedObjectProperties();
        #endregion

        /* =========================================================
         * 4. MODULE: RECRUITMENT
         * ========================================================= */
        #region JobPostings
        CreateMap<JobPosting, JobPostingDto>().ReverseMap();
        CreateMap<CreateUpdateJobPostingDto, JobPosting>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region JobApplications
        CreateMap<JobApplication, JobApplicationDto>().ReverseMap();
        CreateMap<CreateUpdateJobApplicationDto, JobApplication>().IgnoreFullAuditedObjectProperties();
        #endregion

        /* =========================================================
         * 5. MODULE: GEN AI
         * ========================================================= */
        #region ChatSessions
        CreateMap<ChatSession, ChatSessionDto>().ReverseMap();
        CreateMap<CreateUpdateChatSessionDto, ChatSession>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region ChatMessages
        CreateMap<ChatMessage, ChatMessageDto>().ReverseMap();
        CreateMap<CreateUpdateChatMessageDto, ChatMessage>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region AgentThinkingLogs
        CreateMap<AgentThinkingLog, AgentThinkingLogDto>().ReverseMap();
        CreateMap<CreateUpdateAgentThinkingLogDto, AgentThinkingLog>().IgnoreFullAuditedObjectProperties();
        #endregion

        #region UserFeedbacks
        CreateMap<UserFeedback, UserFeedbackDto>().ReverseMap();
        CreateMap<CreateUpdateUserFeedbackDto, UserFeedback>().IgnoreFullAuditedObjectProperties();
        #endregion
    }
}