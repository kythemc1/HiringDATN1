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

public class CandidateCertificateAppService : HiringDATNAppService, ICandidateCertificateAppService
{
    private readonly IRepository<CandidateCertificate, long> _CandidateCertificateRepository;

    public CandidateCertificateAppService(IRepository<CandidateCertificate, long> CandidateCertificateRepository)
    {
        _CandidateCertificateRepository = CandidateCertificateRepository;
    }

    #region CRUD services

    public async Task<CandidateCertificateDto> GetAsync(long id)
    {
        try
        {
            var data = await _CandidateCertificateRepository.GetAsync(id);
            return ObjectMapper.Map<CandidateCertificate, CandidateCertificateDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CandidateCertificateDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _CandidateCertificateRepository.WithDetailsAsync())
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
            .Select(o => ObjectMapper.Map<CandidateCertificate, CandidateCertificateDto>(o))
            .ToList();

        return new PagedResultDto<CandidateCertificateDto>(totalCount, result);
    }


    public async Task<CandidateCertificateDto> CreateAsync(CreateUpdateCandidateCertificateDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateCandidateCertificateDto, CandidateCertificate>(input);

        var dataResult = await _CandidateCertificateRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<CandidateCertificateDto> UpdateAsync(long id, CreateUpdateCandidateCertificateDto input)
    {

        try
        {
            var data = await _CandidateCertificateRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _CandidateCertificateRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _CandidateCertificateRepository.DeleteAsync(id);
    }

    #endregion

}
