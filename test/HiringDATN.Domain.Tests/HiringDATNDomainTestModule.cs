using Volo.Abp.Modularity;

namespace HiringDATN;

[DependsOn(
    typeof(HiringDATNDomainModule),
    typeof(HiringDATNTestBaseModule)
)]
public class HiringDATNDomainTestModule : AbpModule
{

}
