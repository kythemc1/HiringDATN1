using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using HiringDATN.Dtos;
using Volo.Abp.Domain.Repositories;
using HiringDATN.Interfaces;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Service;

public class SkillDefinitionAppService : HiringDATNAppService, ISkillDefinitionAppService
{
    private readonly IRepository<SkillDefinition, long> _SkillDefinitionRepository;

    public SkillDefinitionAppService(IRepository<SkillDefinition, long> SkillDefinitionRepository)
    {
        _SkillDefinitionRepository = SkillDefinitionRepository;
    }

    #region CRUD services

    public async Task<SkillDefinitionDto> GetAsync(long id)
    {
        try
        {
            var data = await _SkillDefinitionRepository.GetAsync(id);
            return ObjectMapper.Map<SkillDefinition, SkillDefinitionDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<SkillDefinitionDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _SkillDefinitionRepository.WithDetailsAsync())
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
            .Select(o => ObjectMapper.Map<SkillDefinition, SkillDefinitionDto>(o))
            .ToList();

        return new PagedResultDto<SkillDefinitionDto>(totalCount, result);
    }


    public async Task<SkillDefinitionDto> CreateAsync(CreateUpdateSkillDefinitionDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateSkillDefinitionDto, SkillDefinition>(input);

        var dataResult = await _SkillDefinitionRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<SkillDefinitionDto> UpdateAsync(long id, CreateUpdateSkillDefinitionDto input)
    {

        try
        {
            var data = await _SkillDefinitionRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _SkillDefinitionRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _SkillDefinitionRepository.DeleteAsync(id);
    }

    #endregion

}
