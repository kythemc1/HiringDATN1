using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using HiringDATN.Interfaces;
using Volo.Abp.Domain.Repositories;
using HiringDATN.Dtos;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Service;

public class CandidateProfileAppService : HiringDATNAppService, ICandidateProfileAppService
{
    private readonly IRepository<CandidateProfile, long> _CandidateProfileRepository;

    public CandidateProfileAppService(IRepository<CandidateProfile, long> CandidateProfileRepository)
    {
        _CandidateProfileRepository = CandidateProfileRepository;
    }

    #region CRUD services

    public async Task<CandidateProfileDto> GetAsync(long id)
    {
        try
        {
            var data = await _CandidateProfileRepository.GetAsync(id);
            return ObjectMapper.Map<CandidateProfile, CandidateProfileDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CandidateProfileDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CandidateProfileRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.AboutMe.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<CandidateProfile, CandidateProfileDto>(o))
            .ToList();

        return new PagedResultDto<CandidateProfileDto>(totalCount, result);
    }


    public async Task<CandidateProfileDto> CreateAsync(CreateUpdateCandidateProfileDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCandidateProfileDto, CandidateProfile>(input);

        var dataResult = await _CandidateProfileRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CandidateProfileDto> UpdateAsync(long id, CreateUpdateCandidateProfileDto input)
    {

        try
        {
            var data = await _CandidateProfileRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CandidateProfileRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CandidateProfileRepository.DeleteAsync(id);
    }

    #endregion

}
