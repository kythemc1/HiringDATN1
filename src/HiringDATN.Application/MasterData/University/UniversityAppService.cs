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

public class UniversityAppService : HiringDATNAppService, IUniversityAppService
{
    private readonly IRepository<University, long> _UniversityRepository;

    public UniversityAppService(IRepository<University, long> UniversityRepository)
    {
        _UniversityRepository = UniversityRepository;
    }

    #region CRUD services

    public async Task<UniversityDto> GetAsync(long id)
    {
        try
        {
            var data = await _UniversityRepository.GetAsync(id);
            return ObjectMapper.Map<University, UniversityDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<UniversityDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _UniversityRepository.WithDetailsAsync())
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
            .Select(o => ObjectMapper.Map<University, UniversityDto>(o))
            .ToList();

        return new PagedResultDto<UniversityDto>(totalCount, result);
    }


    public async Task<UniversityDto> CreateAsync(CreateUpdateUniversityDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateUniversityDto, University>(input);

        var dataResult = await _UniversityRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<UniversityDto> UpdateAsync(long id, CreateUpdateUniversityDto input)
    {

        try
        {
            var data = await _UniversityRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _UniversityRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _UniversityRepository.DeleteAsync(id);
    }

    #endregion

}
