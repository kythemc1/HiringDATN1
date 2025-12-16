using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Interfaces;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Application.Dtos;
using Volo.Abp;
using HiringDATN.Dtos;

using System.Linq.Dynamic.Core;

namespace HiringDATN.AiConfiguration;

public class AiModelConfigAppService : HiringDATNAppService, IAiModelConfigAppService
{
    private readonly IRepository<AiModelConfig, long> _aiModelConfigRepository;

    public AiModelConfigAppService(IRepository<AiModelConfig, long> aiModelConfigRepository)
    {
        _aiModelConfigRepository = aiModelConfigRepository;
    }

    #region CRUD services

    public async Task<AiModelConfigDto> GetAsync(long id)
    {
        try
        {
            var data = await _aiModelConfigRepository.GetAsync(id);
            return ObjectMapper.Map<AiModelConfig, AiModelConfigDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<AiModelConfigDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _aiModelConfigRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.ModelName.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<AiModelConfig, AiModelConfigDto>(o))
            .ToList();

        return new PagedResultDto<AiModelConfigDto>(totalCount, result);
    }


    public async Task<AiModelConfigDto> CreateAsync(CreateUpdateAiModelConfigDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateAiModelConfigDto, AiModelConfig>(input);

        var dataResult = await _aiModelConfigRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<AiModelConfigDto> UpdateAsync(long id, CreateUpdateAiModelConfigDto input)
    {

        try
        {
            var data = await _aiModelConfigRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _aiModelConfigRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _aiModelConfigRepository.DeleteAsync(id);
    }

    #endregion

}
