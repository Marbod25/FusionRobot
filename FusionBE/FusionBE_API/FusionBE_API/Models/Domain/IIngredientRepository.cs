using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Models.Domain
{
    public interface IIngredientRepository
    {
        IEnumerable<Product> GetAll();
        Product GetBy(int id);
        Product GetByName(string productName);
        void SaveChanges();
    }
}
