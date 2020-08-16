using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Models
{
    /* Klasse representeert Cocktails, Mocktails en Limonades */
    public class Product
    {
        #region Properties
        public int ProductId { get; internal set; }
        public string ProductName { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }
        public string Category { get; set; }
        #endregion
        #region Constructors
        public Product()
        {
            Ingredients = new List<Ingredient>();
        }
        #endregion
        /* Methodes om op te roepen */
        #region Methods
        /* Alle drank uit ingredienten halen om ze koud te zetten */
        public List<Ingredient> GetAllDrinks()
        {
            return this.Ingredients.Where(i => i.CategoryEnum.Equals(CategoryEnum.Drank)).ToList();
        }
        public List<Ingredient> GetAllFruit()
        {
            return this.Ingredients.Where(i => i.CategoryEnum.Equals(CategoryEnum.Fruit)).ToList();
        }

        #endregion
    }
}
