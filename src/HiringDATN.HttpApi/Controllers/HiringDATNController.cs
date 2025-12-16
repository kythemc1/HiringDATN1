using HiringDATN.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace HiringDATN.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class HiringDATNController : AbpControllerBase
{
    protected HiringDATNController()
    {
        LocalizationResource = typeof(HiringDATNResource);
    }
}
