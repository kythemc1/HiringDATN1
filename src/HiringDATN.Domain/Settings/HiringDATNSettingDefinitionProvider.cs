using Volo.Abp.Settings;

namespace HiringDATN.Settings;

public class HiringDATNSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(HiringDATNSettings.MySetting1));
    }
}
