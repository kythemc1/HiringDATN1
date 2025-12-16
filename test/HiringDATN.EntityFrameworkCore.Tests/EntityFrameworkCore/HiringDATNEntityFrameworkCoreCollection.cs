using Xunit;

namespace HiringDATN.EntityFrameworkCore;

[CollectionDefinition(HiringDATNTestConsts.CollectionDefinitionName)]
public class HiringDATNEntityFrameworkCoreCollection : ICollectionFixture<HiringDATNEntityFrameworkCoreFixture>
{

}
