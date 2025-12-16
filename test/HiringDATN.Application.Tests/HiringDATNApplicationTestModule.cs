using Volo.Abp.Modularity;

namespace HiringDATN;

[DependsOn(
    typeof(HiringDATNApplicationModule),
    typeof(HiringDATNDomainTestModule)
)]
public class HiringDATNApplicationTestModule : AbpModule
{

}
