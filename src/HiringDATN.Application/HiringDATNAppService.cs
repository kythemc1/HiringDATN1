using System;
using HiringDATN.Localization;
using Volo.Abp.Application.Services;
using HiringDATN.Dtos;
namespace HiringDATN;

/* Inherit your application services from this class.
 */
public abstract class HiringDATNAppService : ApplicationService
{
    protected HiringDATNAppService()
    {
        LocalizationResource = typeof(HiringDATNResource);
        ObjectMapperContext = typeof(HiringDATNApplicationModule);
    }

    protected ApiResponse<T> SuccessResponse<T>(T data, string message = "Thành công")
    {
        return new ApiResponse<T>
        {
            Timestamp = DateTime.Now,
            Success = true,
            Code = "200",
            Message = message,
            Data = data
        };
    }

    protected ApiResponse<T> ErrorResponse<T>(int code, string message, T data)
    {
        return new ApiResponse<T>
        {
            Timestamp = DateTime.Now,
            Success = false,
            Code = code.ToString(),
            Message = message,
            Data = data
        };
    }

    protected ApiResponse<T> ErrorResponse<T>(int code, string message)
    {
        return new ApiResponse<T>
        {
            Timestamp = DateTime.Now,
            Success = false,
            Code = code.ToString(),
            Message = message,
            Data = default
        };
    }

}
