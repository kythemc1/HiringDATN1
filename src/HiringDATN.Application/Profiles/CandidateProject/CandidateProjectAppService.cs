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

public class CandidateProjectAppService : HiringDATNAppService, ICandidateProjectAppService
{
    private readonly IRepository<CandidateProject, long> _CandidateProjectRepository;

    public CandidateProjectAppService(IRepository<CandidateProject, long> CandidateProjectRepository)
    {
        _CandidateProjectRepository = CandidateProjectRepository;
    }

    #region CRUD services

    public async Task<CandidateProjectDto> GetAsync(long id)
    {
        try
        {
            var data = await _CandidateProjectRepository.GetAsync(id);
            return ObjectMapper.Map<CandidateProject, CandidateProjectDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CandidateProjectDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CandidateProjectRepository.WithDetailsAsync())
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
            .Select(o => ObjectMapper.Map<CandidateProject, CandidateProjectDto>(o))
            .ToList();

        return new PagedResultDto<CandidateProjectDto>(totalCount, result);
    }


    public async Task<CandidateProjectDto> CreateAsync(CreateUpdateCandidateProjectDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCandidateProjectDto, CandidateProject>(input);

        var dataResult = await _CandidateProjectRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CandidateProjectDto> UpdateAsync(long id, CreateUpdateCandidateProjectDto input)
    {

        try
        {
            var data = await _CandidateProjectRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CandidateProjectRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CandidateProjectRepository.DeleteAsync(id);
    }

    #endregion

}
