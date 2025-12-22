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

public class CandidateSkillAppService : HiringDATNAppService, ICandidateSkillAppService
{
    private readonly IRepository<CandidateSkill, long> _CandidateSkillRepository;

    public CandidateSkillAppService(IRepository<CandidateSkill, long> CandidateSkillRepository)
    {
        _CandidateSkillRepository = CandidateSkillRepository;
    }

    #region CRUD services

    public async Task<CandidateSkillDto> GetAsync(long id)
    {
        try
        {
            var data = await _CandidateSkillRepository.GetAsync(id);
            return ObjectMapper.Map<CandidateSkill, CandidateSkillDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CandidateSkillDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CandidateSkillRepository.WithDetailsAsync());

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
            .Select(o => ObjectMapper.Map<CandidateSkill, CandidateSkillDto>(o))
            .ToList();

        return new PagedResultDto<CandidateSkillDto>(totalCount, result);
    }


    public async Task<CandidateSkillDto> CreateAsync(CreateUpdateCandidateSkillDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCandidateSkillDto, CandidateSkill>(input);

        var dataResult = await _CandidateSkillRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CandidateSkillDto> UpdateAsync(long id, CreateUpdateCandidateSkillDto input)
    {

        try
        {
            var data = await _CandidateSkillRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CandidateSkillRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CandidateSkillRepository.DeleteAsync(id);
    }

    #endregion

}
