using HiringDATN.Dtos;
using Volo.Abp.Application.Services;

namespace HiringDATN.Interfaces;

public interface IJobAppService : ICrudAppService<JobDto, long, SearchInputDto, CreateUpdateJobDto>
{
}
