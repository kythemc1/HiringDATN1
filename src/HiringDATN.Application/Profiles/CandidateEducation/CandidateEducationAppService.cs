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

public class CandidateEducationAppService : HiringDATNAppService, ICandidateEducationAppService
{
    private readonly IRepository<CandidateEducation, long> _CandidateEducationRepository;

    public CandidateEducationAppService(IRepository<CandidateEducation, long> CandidateEducationRepository)
    {
        _CandidateEducationRepository = CandidateEducationRepository;
    }

    #region CRUD services

    public async Task<CandidateEducationDto> GetAsync(long id)
    {
        try
        {
            var data = await _CandidateEducationRepository.GetAsync(id);
            return ObjectMapper.Map<CandidateEducation, CandidateEducationDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CandidateEducationDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CandidateEducationRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.SchoolName.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<CandidateEducation, CandidateEducationDto>(o))
            .ToList();

        return new PagedResultDto<CandidateEducationDto>(totalCount, result);
    }


    public async Task<CandidateEducationDto> CreateAsync(CreateUpdateCandidateEducationDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCandidateEducationDto, CandidateEducation>(input);

        var dataResult = await _CandidateEducationRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CandidateEducationDto> UpdateAsync(long id, CreateUpdateCandidateEducationDto input)
    {

        try
        {
            var data = await _CandidateEducationRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CandidateEducationRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CandidateEducationRepository.DeleteAsync(id);
    }

    #endregion

}
