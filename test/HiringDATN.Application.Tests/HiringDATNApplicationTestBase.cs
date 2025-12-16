using Volo.Abp.Modularity;

namespace HiringDATN;

public abstract class HiringDATNApplicationTestBase<TStartupModule> : HiringDATNTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
