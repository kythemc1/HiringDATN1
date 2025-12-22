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

public class ChatSessionAppService : HiringDATNAppService, IChatSessionAppService
{
    private readonly IRepository<ChatSession, long> _ChatSessionRepository;

    public ChatSessionAppService(IRepository<ChatSession, long> ChatSessionRepository)
    {
        _ChatSessionRepository = ChatSessionRepository;
    }

    #region CRUD services

    public async Task<ChatSessionDto> GetAsync(long id)
    {
        try
        {
            var data = await _ChatSessionRepository.GetAsync(id);
            return ObjectMapper.Map<ChatSession, ChatSessionDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<ChatSessionDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _ChatSessionRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.SessionType.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<ChatSession, ChatSessionDto>(o))
            .ToList();

        return new PagedResultDto<ChatSessionDto>(totalCount, result);
    }


    public async Task<ChatSessionDto> CreateAsync(CreateUpdateChatSessionDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateChatSessionDto, ChatSession>(input);

        var dataResult = await _ChatSessionRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<ChatSessionDto> UpdateAsync(long id, CreateUpdateChatSessionDto input)
    {

        try
        {
            var data = await _ChatSessionRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _ChatSessionRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _ChatSessionRepository.DeleteAsync(id);
    }

    #endregion

}
