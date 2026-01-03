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
using HiringDATN.Recruitment;

namespace HiringDATN.Service;

public class JobApplicationAppService : HiringDATNAppService, IJobApplicationAppService
{
    private readonly IRepository<JobApplication, long> _JobApplicationRepository;

    public JobApplicationAppService(IRepository<JobApplication, long> JobApplicationRepository)
    {
        _JobApplicationRepository = JobApplicationRepository;
    }

    #region CRUD services

    public async Task<JobApplicationDto> GetAsync(long id)
    {
        try
        {
            var data = await _JobApplicationRepository.GetAsync(id);
            return ObjectMapper.Map<JobApplication, JobApplicationDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<JobApplicationDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _JobApplicationRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.CoverLetter.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<JobApplication, JobApplicationDto>(o))
            .ToList();

        return new PagedResultDto<JobApplicationDto>(totalCount, result);
    }


    public async Task<JobApplicationDto> CreateAsync(CreateUpdateJobApplicationDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateJobApplicationDto, JobApplication>(input);

        var dataResult = await _JobApplicationRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<JobApplicationDto> UpdateAsync(long id, CreateUpdateJobApplicationDto input)
    {

        try
        {
            var data = await _JobApplicationRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _JobApplicationRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _JobApplicationRepository.DeleteAsync(id);
    }

    #endregion

    #region Statistics Services

    // 1. Thống kê số lượng theo trạng thái (Dùng cho biểu đồ Tròn)
    public async Task<List<SimpleChartDto>> GetCountByStatusAsync()
    {
        var query = await _JobApplicationRepository.GetQueryableAsync();

        var data = query
            .GroupBy(x => x.Status)
            .Select(g => new SimpleChartDto
            {
                Label = g.Key.ToString(),
                Value = g.Count()
            })
            .ToList();

        return data;
    }

    // 2. Thống kê số lượng hồ sơ theo Ngày (Dùng cho biểu đồ Đường/Cột)
    public async Task<List<SimpleChartDto>> GetApplicationTrendAsync()
    {
        var query = await _JobApplicationRepository.GetQueryableAsync();
        var sevenDaysAgo = Clock.Now.Date.AddDays(-7);

        // 1. Thực hiện truy vấn và nhóm dữ liệu dưới Database (Server-side)
        var rawData = query
            .Where(x => x.CreationTime >= sevenDaysAgo)
            .GroupBy(x => x.CreationTime.Date)
            .Select(g => new
            {
                Date = g.Key,
                Count = g.Count()
            })
            .OrderBy(x => x.Date)
            .ToList(); // Dữ liệu được tải về RAM tại đây

        // 2. Định dạng lại Label trên RAM (Client-side)
        var result = rawData.Select(x => new SimpleChartDto
        {
            Label = x.Date.ToString("dd/MM"),
            Value = x.Count
        }).ToList();

        return result;
    }

    #endregion

}
