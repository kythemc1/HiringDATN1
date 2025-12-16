using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using HiringDATN.Data;
using Volo.Abp.DependencyInjection;

namespace HiringDATN.EntityFrameworkCore;

public class EntityFrameworkCoreHiringDATNDbSchemaMigrator
    : IHiringDATNDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreHiringDATNDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the HiringDATNDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<HiringDATNDbContext>()
            .Database
            .MigrateAsync();
    }
}
