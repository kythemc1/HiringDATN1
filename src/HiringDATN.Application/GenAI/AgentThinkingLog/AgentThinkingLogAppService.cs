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

public class AgentThinkingLogAppService : HiringDATNAppService, IAgentThinkingLogAppService
{
    private readonly IRepository<AgentThinkingLog, long> _AgentThinkingLogRepository;

    public AgentThinkingLogAppService(IRepository<AgentThinkingLog, long> AgentThinkingLogRepository)
    {
        _AgentThinkingLogRepository = AgentThinkingLogRepository;
    }

    #region CRUD services

    public async Task<AgentThinkingLogDto> GetAsync(long id)
    {
        try
        {
            var data = await _AgentThinkingLogRepository.GetAsync(id);
            return ObjectMapper.Map<AgentThinkingLog, AgentThinkingLogDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<AgentThinkingLogDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _AgentThinkingLogRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.AgentName.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<AgentThinkingLog, AgentThinkingLogDto>(o))
            .ToList();

        return new PagedResultDto<AgentThinkingLogDto>(totalCount, result);
    }


    public async Task<AgentThinkingLogDto> CreateAsync(CreateUpdateAgentThinkingLogDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateAgentThinkingLogDto, AgentThinkingLog>(input);

        var dataResult = await _AgentThinkingLogRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<AgentThinkingLogDto> UpdateAsync(long id, CreateUpdateAgentThinkingLogDto input)
    {

        try
        {
            var data = await _AgentThinkingLogRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _AgentThinkingLogRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _AgentThinkingLogRepository.DeleteAsync(id);
    }

    #endregion

}
