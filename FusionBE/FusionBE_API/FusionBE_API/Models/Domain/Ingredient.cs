using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Models
{
    public class Ingredient
    {
        #region Properties
        public int IngredientId { get; set; }
        public string IngredientName { get; set; }
        public CategoryEnum CategoryEnum { get; set; }
        public double Amount { get; set; }
        public string Unit { get; set; }
        #endregion
        #region Constructors
        public Ingredient() { }
        #endregion
        #region Methods
        public string GetAmountAndUnit()
        {
            return this.Amount + this.Unit;
        }
        #endregion
    }
}
