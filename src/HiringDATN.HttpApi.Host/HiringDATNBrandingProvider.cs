using Microsoft.Extensions.Localization;
using HiringDATN.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace HiringDATN;

[Dependency(ReplaceServices = true)]
public class HiringDATNBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<HiringDATNResource> _localizer;

    public HiringDATNBrandingProvider(IStringLocalizer<HiringDATNResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
