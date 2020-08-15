using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Data
{
    public class FusionDataInitializer
    {
        private readonly FusionContext _dbContext;

        public FusionDataInitializer(FusionContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
            }
        }
    }
}
