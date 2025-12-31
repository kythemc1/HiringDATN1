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

public class JobPostingAppService : HiringDATNAppService, IJobPostingAppService
{
    private readonly IRepository<JobPosting, long> _JobPostingRepository;

    public JobPostingAppService(IRepository<JobPosting, long> JobPostingRepository)
    {
        _JobPostingRepository = JobPostingRepository;
    }

    #region CRUD services

    public async Task<JobPostingDto> GetAsync(long id)
    {
        try
        {
            var data = await _JobPostingRepository.GetAsync(id);
            return ObjectMapper.Map<JobPosting, JobPostingDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<JobPostingDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _JobPostingRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.Benefits.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<JobPosting, JobPostingDto>(o))
            .ToList();

        return new PagedResultDto<JobPostingDto>(totalCount, result);
    }


    public async Task<JobPostingDto> CreateAsync(CreateUpdateJobPostingDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateJobPostingDto, JobPosting>(input);

        var dataResult = await _JobPostingRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<JobPostingDto> UpdateAsync(long id, CreateUpdateJobPostingDto input)
    {

        try
        {
            var data = await _JobPostingRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _JobPostingRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _JobPostingRepository.DeleteAsync(id);
    }

    #endregion

}
