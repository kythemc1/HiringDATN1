using HiringDATN.Dtos;
using System.Threading.Tasks;
using System;
using HiringDATN.Interfaces;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Volo.Abp.ObjectMapping;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Entities;

namespace HiringDATN.NghiepVus;

public class CVAppService : HiringDATNAppService, ICVAppService
{
    private readonly IRepository<CandidateCertificate, long> _candidateCertificateRepository;
    private readonly IRepository<CandidateProfile, long> _candidateProfileRepository;
    private readonly IRepository<CandidateEducation, long> _candidateEducationRepository;
    private readonly IRepository<CandidateExperience, long> _candidateExperienceRepository;
    private readonly IRepository<CandidateProject, long> _candidateProjectRepository;
    private readonly IRepository<CandidateSkill, long> _candidateSkillRepository;
    private readonly IRepository<Company, long> _companyRepository;

    public CVAppService
    (
        IRepository<CandidateCertificate, long> CandidateCertificateRepository,
        IRepository<CandidateProfile, long> CandidateProfileRepository,
        IRepository<CandidateEducation, long> CandidateEducationRepository,
        IRepository<CandidateExperience, long> CandidateExperienceRepository,
        IRepository<CandidateProject, long> CandidateProjectRepository,
        IRepository<CandidateSkill, long> CandidateSkillRepository,
        IRepository<Company, long> CompanyRepository
    )
    {
        _candidateCertificateRepository = CandidateCertificateRepository;
        _candidateProfileRepository = CandidateProfileRepository;
        _candidateEducationRepository = CandidateEducationRepository;
        _candidateExperienceRepository = CandidateExperienceRepository;
        _candidateProjectRepository = CandidateProjectRepository;
        _candidateSkillRepository = CandidateSkillRepository;
        _companyRepository = CompanyRepository;
    }


    #region CRUD services

    public async Task<CVDto> GetAsync(long id)
    {
        try
        {
            // 1. Sử dụng IQueryable để bao gồm các bảng liên quan (Eager Loading)
            // Lưu ý: Đảm bảo Repository của bạn hỗ trợ GetQueryableAsync()
            var query = await _candidateProfileRepository.GetQueryableAsync();

            var profile = query
                .Include(x => x.Certificates)
                .Include(x => x.Educations)
                .Include(x => x.Experiences)
                .Include(x => x.Skills)
                .Include(x => x.Projects)
                .FirstOrDefault(x => x.Id == id);

            if (profile == null)
            {
                throw new EntityNotFoundException(typeof(CandidateProfile), id);
            }

            // 2. Sử dụng AutoMapper để Map Profile Entity sang CVDto
            var result = new CVDto
            {
                CandidateProfileDto = ObjectMapper.Map<CandidateProfile, CandidateProfileDto>(profile),

                CandidateCertificateDtos = ObjectMapper.Map<List<CandidateCertificate>, List<CandidateCertificateDto>>(
                    profile.Certificates?.ToList()),

                CandidateEducationDtos = ObjectMapper.Map<List<CandidateEducation>, List<CandidateEducationDto>>(
                    profile.Educations?.ToList()),

                CandidateExperienceDtos = ObjectMapper.Map<List<CandidateExperience>, List<CandidateExperienceDto>>(
                    profile.Experiences?.ToList()),

                CandidateSkillDtos = ObjectMapper.Map<List<CandidateSkill>, List<CandidateSkillDto>>(
                    profile.Skills?.ToList()),

                CandidateProjectDtos = ObjectMapper.Map<List<CandidateProject>, List<CandidateProjectDto>>(
                    profile.Projects?.ToList())
            };

            return result;
        }
        catch (Exception ex)
        {
            throw new Exception($"Có lỗi khi tìm kiếm với id: {id}.", ex);
        }
    }

    public async Task<PagedResultDto<CVDto>> GetListAsync(SearchInputDto input)
    {
        try
        {
            // 1. Khởi tạo Queryable từ bảng chính
            var query = await _candidateProfileRepository.GetQueryableAsync();

            // 2. Filter: Thêm các điều kiện lọc (Ví dụ theo tên hoặc email)
            query = query.WhereIf(!string.IsNullOrWhiteSpace(input.Keyword),
                x => x.FullName.Contains(input.Keyword) || x.Email.Contains(input.Keyword));

            // 3. Count: Đếm tổng số bản ghi trước khi phân trang
            var totalCount = await AsyncExecuter.CountAsync(query);

            // 4. Eager Loading & Paging: Chỉ Include các bảng con sau khi đã lọc
            var entities = await AsyncExecuter.ToListAsync(
                query.Include(x => x.Certificates)
                     .Include(x => x.Educations)
                     .Include(x => x.Experiences)
                     .Include(x => x.Skills)
                     .Include(x => x.Projects)
                     .OrderBy(input.Sorting ?? "Id desc") 
                     .PageBy(input.SkipCount, input.MaxResultCount)
            );

            // 5. Mapping: Chuyển đổi list Entity sang list DTO
            var cvDtos = entities.Select(profile => new CVDto
            {
                CandidateProfileDto = ObjectMapper.Map<CandidateProfile, CandidateProfileDto>(profile),
                CandidateCertificateDtos = ObjectMapper.Map<List<CandidateCertificate>, List<CandidateCertificateDto>>(profile.Certificates?.ToList()),
                CandidateEducationDtos = ObjectMapper.Map<List<CandidateEducation>, List<CandidateEducationDto>>(profile.Educations?.ToList()),
                CandidateExperienceDtos = ObjectMapper.Map<List<CandidateExperience>, List<CandidateExperienceDto>>(profile.Experiences?.ToList()),
                CandidateSkillDtos = ObjectMapper.Map<List<CandidateSkill>, List<CandidateSkillDto>>(profile.Skills?.ToList()),
                CandidateProjectDtos = ObjectMapper.Map<List<CandidateProject>, List<CandidateProjectDto>>(profile.Projects?.ToList())
            }).ToList();

            return new PagedResultDto<CVDto>(totalCount, cvDtos);
        }
        catch (Exception ex)
        {
            throw new Exception("Có lỗi khi lấy danh sách CV.", ex);
        }
    }
    public async Task<CVDto> CreateAsync(CreateUpdateCVDto input)
    {
        try
        {
            var profile = ObjectMapper.Map<CreateUpdateCandidateProfileDto, CandidateProfile>(input.CreateUpdateCandidateProfileDto);

            // autoSave: true giúp ID được cập nhật vào object 'profile' ngay lập tức
            var insertedProfile = await _candidateProfileRepository.InsertAsync(profile, autoSave: true);
            var profileId = insertedProfile.Id;

            // Certificates
            if (input.CreateUpdateCandidateCertificateDtos != null && input.CreateUpdateCandidateCertificateDtos.Any())
            {
                var certificates = ObjectMapper.Map<List<CreateUpdateCandidateCertificateDto>, List<CandidateCertificate>>(input.CreateUpdateCandidateCertificateDtos);
                certificates.ForEach(x => x.ProfileId = profileId);
                await _candidateCertificateRepository.InsertManyAsync(certificates);
            }

            // Education
            if (input.CreateUpdateCandidateEducationDtos != null && input.CreateUpdateCandidateEducationDtos.Any())
            {
                var educations = ObjectMapper.Map<List<CreateUpdateCandidateEducationDto>, List<CandidateEducation>>(input.CreateUpdateCandidateEducationDtos);
                educations.ForEach(x => x.ProfileId = profileId);
                await _candidateEducationRepository.InsertManyAsync(educations);
            }

            // Experience
            if (input.CreateUpdateCandidateCertificateDtos != null && input.CreateUpdateCandidateCertificateDtos.Any())
            {
                var experiences = ObjectMapper.Map<List<CreateUpdateCandidateExperienceDto>, List<CandidateExperience>>(input.CreateUpdateCandidateExperienceDtos);
                experiences.ForEach(x => x.ProfileId = profileId);
                await _candidateExperienceRepository.InsertManyAsync(experiences);
            }
            // Skills
            if (input.CreateUpdateCandidateSkillDtos != null && input.CreateUpdateCandidateSkillDtos.Any())
            {
                var skills = ObjectMapper.Map<List<CreateUpdateCandidateSkillDto>, List<CandidateSkill>>(input.CreateUpdateCandidateSkillDtos);
                skills.ForEach(x => x.ProfileId = profileId);
                await _candidateSkillRepository.InsertManyAsync(skills);
            }

            // 5. Projects
            if (input.CreateUpdateCandidateProjectDtos != null && input.CreateUpdateCandidateProjectDtos.Any())
            {
                var projects = ObjectMapper.Map<List<CreateUpdateCandidateProjectDto>, List<CandidateProject>>(input.CreateUpdateCandidateProjectDtos);
                projects.ForEach(x => x.ProfileId = profileId);
                await _candidateProjectRepository.InsertManyAsync(projects);
            }
            // Lưu tất cả thay đổi vào Database
            await CurrentUnitOfWork.SaveChangesAsync();

            // Trả về kết quả (Bạn có thể map ngược lại profile sang DTO nếu cần)
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện tạo mới: " + e.Message);
        }
    }

    public async Task<CVDto> UpdateAsync(long id, CreateUpdateCVDto input)
    {

        try
        {
            //var data = await _candidateCertificateRepository.GetAsync(id);
            //ObjectMapper.Map(input, data);
            //await _candidateCertificateRepository.UpdateAsync(data);
            return new();
        }
        catch (Exception e)
        {
            throw new Exception("Xảy ra lỗi khi thực hiện cập nhật: " + e.Message);
        }

    }

    public async Task DeleteAsync(long id)
    {
        await _candidateCertificateRepository.DeleteAsync(id);
    }

    #endregion
}
