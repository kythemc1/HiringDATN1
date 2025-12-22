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

public class UserFeedbackAppService : HiringDATNAppService, IUserFeedbackAppService
{
    private readonly IRepository<UserFeedback, long> _UserFeedbackRepository;

    public UserFeedbackAppService(IRepository<UserFeedback, long> UserFeedbackRepository)
    {
        _UserFeedbackRepository = UserFeedbackRepository;
    }

    #region CRUD services

    public async Task<UserFeedbackDto> GetAsync(long id)
    {
        try
        {
            var data = await _UserFeedbackRepository.GetAsync(id);
            return ObjectMapper.Map<UserFeedback, UserFeedbackDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<UserFeedbackDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _UserFeedbackRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.Comment.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<UserFeedback, UserFeedbackDto>(o))
            .ToList();

        return new PagedResultDto<UserFeedbackDto>(totalCount, result);
    }


    public async Task<UserFeedbackDto> CreateAsync(CreateUpdateUserFeedbackDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateUserFeedbackDto, UserFeedback>(input);

        var dataResult = await _UserFeedbackRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<UserFeedbackDto> UpdateAsync(long id, CreateUpdateUserFeedbackDto input)
    {

        try
        {
            var data = await _UserFeedbackRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _UserFeedbackRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _UserFeedbackRepository.DeleteAsync(id);
    }

    #endregion

}
