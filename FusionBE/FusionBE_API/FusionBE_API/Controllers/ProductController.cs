using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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

        // GET: api/Product/ByName/
        /// <summary>
        /// Get product by name
        /// </summary>
        /// <returns>Product</returns>
        [HttpGet("ByName/{name}")]
        public ActionResult<Product> GetProductByName(string name)
        {
            return _productRepository.GetByName(name);
        }

        // GET: api/Product
        ///<summary>
        /// Get all drinks from a product
        ///</summary>
        /// <returns>array of ingredients</returns>
        [HttpGet("Drinks/{name}")]
        public IEnumerable<Ingredient> GetDrinks(string name)
        {
            Product p = _productRepository.GetByName(name);
            return p.GetAllDrinks();
        }

        // GET: api/Product
        ///<summary>
        /// Get all fruits from a product
        ///</summary>
        /// <returns>array of ingredients</returns>
        [HttpGet("Fruits/{name}")]
        public IEnumerable<Ingredient> GetFruits(string name)
        {
            Product p = _productRepository.GetByName(name);
            return p.GetAllFruit();
        }

    }
}