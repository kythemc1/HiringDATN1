using HiringDATN.Samples;
using Xunit;

namespace HiringDATN.EntityFrameworkCore.Applications;

[Collection(HiringDATNTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<HiringDATNEntityFrameworkCoreTestModule>
{

}
