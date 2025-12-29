using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CandidateCertificateDto : AuditedEntityDto<long?>
{
    public long ProfileId { get; set; }
    public string? Name { get; set; }
    public string? Issuer { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public string? CredentialUrl { get; set; }
}

public class CreateUpdateCandidateCertificateDto : EntityDto<long?>
{
    public long ProfileId { get; set; }
    public string? Name { get; set; }
    public string? Issuer { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public string? CredentialUrl { get; set; }
}