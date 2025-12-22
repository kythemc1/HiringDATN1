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

public class CompanyAppService : HiringDATNAppService, ICompanyAppService
{
    private readonly IRepository<Company, long> _CompanyRepository;

    public CompanyAppService(IRepository<Company, long> CompanyRepository)
    {
        _CompanyRepository = CompanyRepository;
    }

    #region CRUD services

    public async Task<CompanyDto> GetAsync(long id)
    {
        try
        {
            var data = await _CompanyRepository.GetAsync(id);
            return ObjectMapper.Map<Company, CompanyDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CompanyDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CompanyRepository.WithDetailsAsync())
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
            .Select(o => ObjectMapper.Map<Company, CompanyDto>(o))
            .ToList();

        return new PagedResultDto<CompanyDto>(totalCount, result);
    }


    public async Task<CompanyDto> CreateAsync(CreateUpdateCompanyDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCompanyDto, Company>(input);

        var dataResult = await _CompanyRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CompanyDto> UpdateAsync(long id, CreateUpdateCompanyDto input)
    {

        try
        {
            var data = await _CompanyRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CompanyRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CompanyRepository.DeleteAsync(id);
    }

    #endregion

}
