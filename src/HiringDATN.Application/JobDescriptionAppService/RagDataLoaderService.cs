using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using HiringDATN.Service;

namespace HiringDATN.Service;

public class RagDataLoaderService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<RagDataLoaderService> _logger;

    public RagDataLoaderService(IServiceProvider serviceProvider, ILogger<RagDataLoaderService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("🚀 [RAG] Đang khởi động tiến trình nạp dữ liệu vào bộ nhớ AI...");

        // Vì AppService thường là Scoped, còn BackgroundService là Singleton
        //    // nên ta phải tạo một Scope mới để lấy dịch vụ ra.
        //    using (var scope = _serviceProvider.CreateScope())
        //    {
        //        var jobService = scope.ServiceProvider.GetRequiredService<JobDescriptionAppService>();

        //        // 1. Xác định đường dẫn file JSON
        //        // Mẹo: Nên để file json trong thư mục gốc của dự án hoặc wwwroot
        //        string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "CompanyData.json");

        //        // Hoặc nếu bạn để cứng đường dẫn (chỉ dùng lúc dev):
        //        // string filePath = @"D:\HiringDATN\Data\CompanyData.json";

        //        if (File.Exists(filePath))
        //        {
        //            try
        //            {
        //                // 2. Gọi hàm nạp dữ liệu
        //                string result = await jobService.ImportCompanyKnowledgeAsync(filePath);
        //                _logger.LogInformation($"✅ [RAG] {result}");
        //            }
        //            catch (Exception ex)
        //            {
        //                _logger.LogError($"❌ [RAG] Lỗi khi nạp dữ liệu: {ex.Message}");
        //            }
        //        }
        //        else
        //        {
        //            _logger.LogWarning($"⚠️ [RAG] Không tìm thấy file dữ liệu tại: {filePath}");
        //        }
        //    }
    }
}