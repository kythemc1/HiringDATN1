using AutoMapper;

namespace HiringDATN.Extensions;


public static class AutoMapperExtensions
{
    public static IMappingExpression<TSource, TDestination> IgnoreFullAuditedObjectProperties<TSource, TDestination>(
        this IMappingExpression<TSource, TDestination> map)
        where TDestination : class
    {
        // Danh sách các property muốn ignore
        var propsToIgnore = new[]
        {
            "CreatorId",
            "CreationTime",
            "LastModifierId",
            "LastModificationTime",
            "IsDeleted",
            "DeleterId",
            "DeletionTime",
            "ExtraProperties",
            "Id"
        };

        var type = typeof(TDestination);

        foreach (var propName in propsToIgnore)
        {
            // Chỉ Ignore nếu property đó thực sự tồn tại trong class đích (TDestination)
            if (type.GetProperty(propName) != null)
            {
                map.ForMember(propName, opt => opt.Ignore());
            }
        }

        return map;
    }
}