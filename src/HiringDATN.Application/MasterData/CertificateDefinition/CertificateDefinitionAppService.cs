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

public class CertificateDefinitionAppService : HiringDATNAppService, ICertificateDefinitionAppService
{
    private readonly IRepository<CertificateDefinition, long> _CertificateDefinitionRepository;

    public CertificateDefinitionAppService(IRepository<CertificateDefinition, long> CertificateDefinitionRepository)
    {
        _CertificateDefinitionRepository = CertificateDefinitionRepository;
    }

    #region CRUD services

    public async Task<CertificateDefinitionDto> GetAsync(long id)
    {
        try
        {
            var data = await _CertificateDefinitionRepository.GetAsync(id);
            return ObjectMapper.Map<CertificateDefinition, CertificateDefinitionDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CertificateDefinitionDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CertificateDefinitionRepository.WithDetailsAsync())
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
            .Select(o => ObjectMapper.Map<CertificateDefinition, CertificateDefinitionDto>(o))
            .ToList();

        return new PagedResultDto<CertificateDefinitionDto>(totalCount, result);
    }


    public async Task<CertificateDefinitionDto> CreateAsync(CreateUpdateCertificateDefinitionDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCertificateDefinitionDto, CertificateDefinition>(input);

        var dataResult = await _CertificateDefinitionRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CertificateDefinitionDto> UpdateAsync(long id, CreateUpdateCertificateDefinitionDto input)
    {

        try
        {
            var data = await _CertificateDefinitionRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CertificateDefinitionRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CertificateDefinitionRepository.DeleteAsync(id);
    }

    #endregion

}
