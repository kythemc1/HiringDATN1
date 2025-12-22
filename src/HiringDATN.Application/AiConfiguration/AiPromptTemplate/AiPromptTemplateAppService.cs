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

public class AiPromptTemplateAppService : HiringDATNAppService, IAiPromptTemplateAppService
{
    private readonly IRepository<AiPromptTemplate, long> _AiPromptTemplateRepository;

    public AiPromptTemplateAppService(IRepository<AiPromptTemplate, long> AiPromptTemplateRepository)
    {
        _AiPromptTemplateRepository = AiPromptTemplateRepository;
    }

    #region CRUD services

    public async Task<AiPromptTemplateDto> GetAsync(long id)
    {
        try
        {
            var data = await _AiPromptTemplateRepository.GetAsync(id);
            return ObjectMapper.Map<AiPromptTemplate, AiPromptTemplateDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<AiPromptTemplateDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _AiPromptTemplateRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.Code.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<AiPromptTemplate, AiPromptTemplateDto>(o))
            .ToList();

        return new PagedResultDto<AiPromptTemplateDto>(totalCount, result);
    }


    public async Task<AiPromptTemplateDto> CreateAsync(CreateUpdateAiPromptTemplateDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateAiPromptTemplateDto, AiPromptTemplate>(input);

        var dataResult = await _AiPromptTemplateRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<AiPromptTemplateDto> UpdateAsync(long id, CreateUpdateAiPromptTemplateDto input)
    {

        try
        {
            var data = await _AiPromptTemplateRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _AiPromptTemplateRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _AiPromptTemplateRepository.DeleteAsync(id);
    }

    #endregion

}
