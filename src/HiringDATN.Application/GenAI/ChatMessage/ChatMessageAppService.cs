using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.Internal.Mappers;
using HiringDATN.Dtos;
using HiringDATN.Interfaces;
using HiringDATN;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using System.Linq.Dynamic.Core;

namespace HiringDATN.Service;

public class ChatMessageAppService : HiringDATNAppService, IChatMessageAppService
{
    private readonly IRepository<ChatMessage, long> _ChatMessageRepository;

    public ChatMessageAppService(IRepository<ChatMessage, long> ChatMessageRepository)
    {
        _ChatMessageRepository = ChatMessageRepository;
    }

    #region CRUD services

    public async Task<ChatMessageDto> GetAsync(long id)
    {
        try
        {
            var data = await _ChatMessageRepository.GetAsync(id);
            return ObjectMapper.Map<ChatMessage, ChatMessageDto>(data);
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<ChatMessageDto>> GetListAsync(SearchInputDto input)
    {
        var query = (await _ChatMessageRepository.WithDetailsAsync())
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.Content.Contains(input.Keyword));

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
            .Select(o => ObjectMapper.Map<ChatMessage, ChatMessageDto>(o))
            .ToList();

        return new PagedResultDto<ChatMessageDto>(totalCount, result);
    }


    public async Task<ChatMessageDto> CreateAsync(CreateUpdateChatMessageDto input)
    {
        var data = ObjectMapper.Map<CreateUpdateChatMessageDto, ChatMessage>(input);

        var dataResult = await _ChatMessageRepository.InsertAsync(data);
        await CurrentUnitOfWork.SaveChangesAsync();
        return new();
    }

    public async Task<ChatMessageDto> UpdateAsync(long id, CreateUpdateChatMessageDto input)
    {

        try
        {
            var data = await _ChatMessageRepository.GetAsync(id);
            ObjectMapper.Map(input, data);
            await _ChatMessageRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _ChatMessageRepository.DeleteAsync(id);
    }

    #endregion

}
