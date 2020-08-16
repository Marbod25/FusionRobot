using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FusionBE_API.Models;
using FusionBE_API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FusionBE_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository context)
        {
            _productRepository = context;
        }

        // GET: api/Product
        /// <summary>
        /// Get all products ordered by name
        /// </summary>
        /// <returns>array of products</returns>
        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _productRepository.GetAll();
        }

        // GET: api/Product
        /// <summary>
        /// Get all products from category ordered by name
        /// </summary>
        /// <returns>array of products</returns>
        [HttpGet("{category}")]
        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            return _productRepository.GetByCategory(category);
        }
    }
}