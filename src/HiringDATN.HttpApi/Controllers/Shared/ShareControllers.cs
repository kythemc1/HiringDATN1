using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Authorization;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace HiringDATN.Controllers;

[Area("HiringDATN")]
[Route("api/shared")]
[Authorize]
public class ShareControllers : AbpController
{
    private readonly IdentityUserManager _userManager;

    public ShareControllers(IdentityUserManager userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("roles")]
    public async Task<List<string>> GetListRole()
    {
        var userId = CurrentUser.GetId();
        if (userId == null)
        {
            throw new AbpAuthorizationException("User chưa đăng nhập");
        }

        var user = await _userManager.GetByIdAsync(userId);
        var roles = await _userManager.GetRolesAsync(user);

        return roles.ToList();
    }
}
