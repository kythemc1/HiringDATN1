using HiringDATN.Dtos;
using Volo.Abp.Application.Services;

namespace HiringDATN.Interfaces;

public interface ICVAppService : ICrudAppService<CVDto, long, SearchInputDto, CreateUpdateCVDto>
{
}
