using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Models.Domain
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAll();
        Product GetBy(int id);
        IEnumerable<Product> GetByCategory(string category);
        Product GetByName(string name);
    }
}
