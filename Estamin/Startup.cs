using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Estamin.Startup))]
namespace Estamin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
