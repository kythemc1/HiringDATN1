using HiringDATN.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace HiringDATN.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(HiringDATNEntityFrameworkCoreModule),
    typeof(HiringDATNApplicationContractsModule)
)]
public class HiringDATNDbMigratorModule : AbpModule
{
}
