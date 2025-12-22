using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using HiringDATN.Interfaces;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using System.Linq.Dynamic.Core;

namespace HiringDATN.Service;

public class JobPositionAppService : HiringDATNAppService, IJobPositionAppService
{
    private readonly IRepository<JobPosition, long> _JobPositionRepository;

    public JobPositionAppService(IRepository<JobPosition, long> JobPositionRepository)
    {
        _JobPositionRepository = JobPositionRepository;
    }

    #region CRUD services

    public async Task<JobPositionDto> GetAsync(long id)
    {
        try
        {
            var data = await _JobPositionRepository.GetAsync(id);
            return ObjectMapper.Map<JobPosition, JobPositionDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<JobPositionDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _JobPositionRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.Name.Contains(input.Keyword));

        // Đếm sau khi filter
        var totalCount = await AsyncExecuter.CountAsync(query);

        // Sort
        query = !string.IsNullOrWhiteSpace(input.Sorting)
            ? query.OrderBy(input.Sorting)
            : query.OrderByDescending(x => x.LastModificationTime ?? x.CreationTime);

        // Paging
        var items = await AsyncExecuter.ToListAsync(query.PageBy(input));

        // Map
        var result = items
            .Select(o => ObjectMapper.Map<JobPosition, JobPositionDto>(o))
            .ToList();

        return new PagedResultDto<JobPositionDto>(totalCount, result);
    }


    public async Task<JobPositionDto> CreateAsync(CreateUpdateJobPositionDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateJobPositionDto, JobPosition>(input);

        var dataResult = await _JobPositionRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<JobPositionDto> UpdateAsync(long id, CreateUpdateJobPositionDto input)
    {

        try
        {
            var data = await _JobPositionRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _JobPositionRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _JobPositionRepository.DeleteAsync(id);
    }

    #endregion

}
