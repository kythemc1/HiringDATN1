using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiringDATN.Dtos;

public class CoverLetterGenerationInputDto
{
    // --- 1. Thông tin ứng viên (Để AI điền vào Header thư) ---
    [Required(ErrorMessage = "Vui lòng nhập tên ứng viên.")]
    public string CandidateName { get; set; }

    public string CandidateEmail { get; set; }

    public string CandidatePhone { get; set; }

    // --- 2. Nội dung CV (Cốt lõi để AI so khớp) ---
    // Đây có thể là text thô mà user copy từ file PDF ra, 
    // hoặc JSON string nếu bạn đã parse CV trước đó.
    [Required(ErrorMessage = "Nội dung CV không được để trống.")]
    [StringLength(10000, ErrorMessage = "CV quá dài, vui lòng tóm tắt.")]
    public string CvContent { get; set; }

    // --- 3. Thông tin Công ty & Việc làm (Target) ---
    [Required(ErrorMessage = "Vui lòng nhập tên công ty.")]
    public string TargetCompanyName { get; set; }

    [Required(ErrorMessage = "Vui lòng nhập vị trí ứng tuyển.")]
    public string TargetJobTitle { get; set; }

    // Người dùng copy đoạn Job Description (JD) vào đây
    [Required(ErrorMessage = "Vui lòng cung cấp mô tả công việc.")]
    public string JobDescription { get; set; }

    // --- 4. Tùy chỉnh phong cách (Customization) ---

    // Ngôn ngữ muốn viết: "vi-VN" hoặc "en-US"
    public string Language { get; set; } = "vi-VN";

    // Phong cách viết (Chọn từ Dropdown): Professional, Startup, Creative...
    public CoverLetterTone Tone { get; set; } = CoverLetterTone.Professional;
}

// Enum cho phong cách viết để dễ quản lý trên UI
public enum CoverLetterTone
{
    Professional, // Trang trọng (Ngân hàng, Nhà nước)
    Startup,      // Năng động, nhiệt huyết (Công ty công nghệ)
    Creative,     // Sáng tạo, bay bổng (Marketing, Design)
    Confident     // Tự tin, mạnh mẽ (Sales, Leader)
}
