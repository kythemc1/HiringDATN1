using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiringDATN.Dtos;

public class ApiResponse<T>
{
    public DateTime Timestamp { get; set; }
    public bool Success { get; set; }
    public string Code { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }

    public ApiResponse() { }

    public ApiResponse(DateTime timestamp, bool success, string? code, string? message, T data)
    {
        Timestamp = timestamp;
        Success = success;
        Code = code;
        Message = message;
        Data = data;
    }
    public ApiResponse(DateTime timestamp, bool success, string? code, string? message)
    {
        Timestamp = timestamp;
        Success = success;
        Code = code;
        Message = message;
        Data = default(T);
    }
}
