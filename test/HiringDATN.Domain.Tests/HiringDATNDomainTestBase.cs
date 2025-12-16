using Volo.Abp.Modularity;

namespace HiringDATN;

/* Inherit from this class for your domain layer tests. */
public abstract class HiringDATNDomainTestBase<TStartupModule> : HiringDATNTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
