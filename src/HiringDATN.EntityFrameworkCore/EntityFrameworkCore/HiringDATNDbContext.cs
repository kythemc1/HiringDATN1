using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using HiringDATN.Recruitment;
using HiringDATN.EntityFrameworkCore.Configurations.AiConfiguration;
using HiringDATN.EntityFrameworkCore.Configurations.MasterData;
using HiringDATN.EntityFrameworkCore.Configurations.Profiles;
using HiringDATN.EntityFrameworkCore.Configurations.Recruitment;

namespace HiringDATN.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class HiringDATNDbContext :
    AbpDbContext<HiringDATNDbContext>,
    ITenantManagementDbContext,
    IIdentityDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */


    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext and ISaasDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext and ISaasDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    // Business
    public DbSet<AiModelConfig> AiModelConfigs { get; set; }
    public DbSet<AiPromptTemplate> AiPromptTemplates { get; set; }


    public DbSet<SkillDefinition> SkillDefinitions { get; set; }
    public DbSet<JobPosition> JobPositions { get; set; }
    public DbSet<University> Universities { get; set; }
    public DbSet<CertificateDefinition> CertificateDefinitions { get; set; }


    public DbSet<Company> Companies { get; set; }
    public DbSet<CandidateProfile> CandidateProfiles { get; set; }

    public DbSet<CandidateExperience> CandidateExperiences { get; set; }
    public DbSet<CandidateEducation> CandidateEducations { get; set; }
    public DbSet<CandidateProject> CandidateProjects { get; set; }
    public DbSet<CandidateCertificate> CandidateCertificates { get; set; }
    public DbSet<CandidateSkill> CandidateSkills { get; set; }


    public DbSet<JobPosting> JobPostings { get; set; }
    public DbSet<JobApplication> JobApplications { get; set; }

    public DbSet<ChatSession> ChatSessions { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }
    public DbSet<AgentThinkingLog> AgentThinkingLogs { get; set; }
    public DbSet<UserFeedback> UserFeedbacks { get; set; }
    #endregion

    public HiringDATNDbContext(DbContextOptions<HiringDATNDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureFeatureManagement();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureTenantManagement();
        builder.ConfigureBlobStoring();
        
        /* Configure your own tables/entities inside here */

        builder.ApplyConfiguration(new AiModelConfigConfigurations());
        builder.ApplyConfiguration(new AiPromptTemplateConfigurations());
        builder.ApplyConfiguration(new SkillDefinitionConfigurations());
        builder.ApplyConfiguration(new JobPositionConfigurations());
        builder.ApplyConfiguration(new UniversityConfigurations());
        builder.ApplyConfiguration(new CertificateDefinitionConfigurations());

        builder.ApplyConfiguration(new CompanyConfigurations());
        builder.ApplyConfiguration(new CandidateProfileConfigurations());
        builder.ApplyConfiguration(new CandidateExperienceConfigurations());
        builder.ApplyConfiguration(new CandidateEducationConfigurations());
        builder.ApplyConfiguration(new CandidateProjectConfigurations());
        builder.ApplyConfiguration(new CandidateCertificateConfigurations());
        builder.ApplyConfiguration(new CandidateSkillConfigurations());
        builder.ApplyConfiguration(new JobPostingConfigurations());
        builder.ApplyConfiguration(new JobApplicationConfigurations());
        builder.ApplyConfiguration(new ChatSessionConfigurations());
        builder.ApplyConfiguration(new ChatMessageConfigurations());
        builder.ApplyConfiguration(new AgentThinkingLogConfigurations());
        builder.ApplyConfiguration(new UserFeedbackConfigurations());




        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(HiringDATNConsts.DbTablePrefix + "YourEntities", HiringDATNConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});
    }
}
