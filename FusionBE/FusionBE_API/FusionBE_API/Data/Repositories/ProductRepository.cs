using FusionBE_API.Models;
using FusionBE_API.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly FusionContext _context;
        private readonly DbSet<Product> _products;

        public ProductRepository(FusionContext dbContext)
        {
            _context = dbContext;
            _products = dbContext.Products;
        }
        public IEnumerable<Product> GetAll()
        {
            return this._products.Include(p => p.Ingredients);
        }

        public Product GetBy(int id)
        {
            return this._products.Include(p => p.Ingredients).FirstOrDefault(p => p.ProductId == id);
        }

        public IEnumerable<Product> GetByCategory(string category)
        {
            return this._products.Include(p => p.Ingredients).Where(p => p.Category == category);
        }

        public Product GetByName(string name)
        {
            return this._products.Include(p => p.Ingredients).FirstOrDefault(p => p.ProductName == name);
        }
    }
}
