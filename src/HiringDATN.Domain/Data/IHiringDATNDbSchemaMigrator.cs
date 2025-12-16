using System.Threading.Tasks;

namespace HiringDATN.Data;

public interface IHiringDATNDbSchemaMigrator
{
    Task MigrateAsync();
}
