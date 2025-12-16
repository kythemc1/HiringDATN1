using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using Volo.Abp.Application.Services;

namespace HiringDATN.Interfaces;
public interface IUserFeedbackAppService : ICrudAppService<UserFeedbackDto, long, SearchInputDto, CreateUpdateUserFeedbackDto>
{
}