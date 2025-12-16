using HiringDATN.Samples;
using Xunit;

namespace HiringDATN.EntityFrameworkCore.Domains;

[Collection(HiringDATNTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<HiringDATNEntityFrameworkCoreTestModule>
{

}
