using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Identity;
using Volo.Abp.Users;
using System.Linq;

namespace HiringDATN.Shared;

public class ShareAppService : HiringDATNAppService
{
    private readonly IdentityUserManager _userManager;

    public ShareAppService(IdentityUserManager userManager)
    {
        _userManager = userManager;
    }

    public async Task<List<string>> GetCurrentUserRoleNamesAsync()
    {
        var user = await _userManager.GetByIdAsync(CurrentUser.GetId());
        var roles = await _userManager.GetRolesAsync(user);
        return roles.ToList();
    }
}
