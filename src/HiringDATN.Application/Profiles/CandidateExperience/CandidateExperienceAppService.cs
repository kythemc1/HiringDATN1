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

public class CandidateExperienceAppService : HiringDATNAppService, ICandidateExperienceAppService
{
    private readonly IRepository<CandidateExperience, long> _CandidateExperienceRepository;

    public CandidateExperienceAppService(IRepository<CandidateExperience, long> CandidateExperienceRepository)
    {
        _CandidateExperienceRepository = CandidateExperienceRepository;
    }

    #region CRUD services

    public async Task<CandidateExperienceDto> GetAsync(long id)
    {
        try
        {
            var data = await _CandidateExperienceRepository.GetAsync(id);
            return ObjectMapper.Map<CandidateExperience, CandidateExperienceDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CandidateExperienceDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CandidateExperienceRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.CompanyName.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<CandidateExperience, CandidateExperienceDto>(o))
            .ToList();

        return new PagedResultDto<CandidateExperienceDto>(totalCount, result);
    }


    public async Task<CandidateExperienceDto> CreateAsync(CreateUpdateCandidateExperienceDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCandidateExperienceDto, CandidateExperience>(input);

        var dataResult = await _CandidateExperienceRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CandidateExperienceDto> UpdateAsync(long id, CreateUpdateCandidateExperienceDto input)
    {

        try
        {
            var data = await _CandidateExperienceRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CandidateExperienceRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CandidateExperienceRepository.DeleteAsync(id);
    }

    #endregion

}
