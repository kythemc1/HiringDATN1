using HiringDATN.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace HiringDATN.Permissions;

public class HiringDATNPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(HiringDATNPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(HiringDATNPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<HiringDATNResource>(name);
    }
}
