using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace HiringDATN.Data;

/* This is used if database provider does't define
 * IHiringDATNDbSchemaMigrator implementation.
 */
public class NullHiringDATNDbSchemaMigrator : IHiringDATNDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
