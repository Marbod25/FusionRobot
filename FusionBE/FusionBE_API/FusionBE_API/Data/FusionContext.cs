using FusionBE_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FusionBE_API.Data
{
    public class FusionContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public FusionContext(DbContextOptions<FusionContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Product>().Property(p => p.ProductName).IsRequired().HasMaxLength(50);
            builder.Entity<Product>().HasMany(p => p.Ingredients).WithOne().IsRequired().HasForeignKey("ProductId"); ;

            builder.Entity<Ingredient>().Property(i => i.Amount).IsRequired();
            builder.Entity<Ingredient>().Property(i => i.Unit).IsRequired().HasMaxLength(10);
            builder.Entity<Ingredient>().Property(i => i.CategoryEnum).HasColumnType("NVARCHAR(50)").IsRequired();

            builder.Entity<Product>().HasData(
                 new { ProductId = 1, ProductName = "Healthy Blood", Category = "Cocktail" },
                 new { ProductId = 2, ProductName = "Basil Wonder", Category = "Mocktail" },
                 new { ProductId = 3, ProductName = "Ferdinand", Category = "Lemonade" }
                 /*new { ProductId = 4, ProductName = "Cosmonaut", Description = "A marvelous drink", CategoryId = 1 },
                 new { ProductId = 5, ProductName = "Bee Happy", Description = "A marvelous drink", CategoryId = 1 },
                 new { ProductId = 6, ProductName = "Daring Margarita", Description = "A marvelous drink", CategoryId = 1 },
                 new { ProductId = 7, ProductName = "Blueberry Mojito", Description = "A marvelous drink", CategoryId = 1 },
                 new { ProductId = 8, ProductName = "St. Tropez Cooler", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 9, ProductName = "Cosmopolitan Deluxe", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 10, ProductName = "Cuban Mojito", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 11, ProductName = "Red Devil", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 12, ProductName = "Strawberry Daiquiri", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 13, ProductName = "Whiskey Sour", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 14, ProductName = "Blue Lagoon", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 15, ProductName = "Lillet Blush", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 16, ProductName = "Cordial Blossom", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 17, ProductName = "Summer Flirt", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 18, ProductName = "Spritz Al Bitter", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 19, ProductName = "Smoky Blood", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 20, ProductName = "Eve's Apple", Description = "A marvelous drink", CategoryId = 2 },
                 new { ProductId = 21, ProductName = "Bush Berry", Description = "A marvelous drink", CategoryId = 3 },
                 new { ProductId = 22, ProductName = "Tropical Clouds", Description = "A marvelous drink", CategoryId = 3 }*/
                 );

            builder.Entity<Ingredient>().HasData(
                new { IngredientId = 1, IngredientName = "Whiskey", CategoryEnum = CategoryEnum.Drank, Amount = 5000.00, Unit = "ml", ProductId = 1 },
                new { IngredientId = 2, IngredientName = "Whiskey", CategoryEnum = CategoryEnum.Drank, Amount = 5000.00, Unit = "ml", ProductId = 2 },
                new { IngredientId = 3, IngredientName = "Whiskey", CategoryEnum = CategoryEnum.Drank, Amount = 5000.00, Unit = "ml", ProductId = 3 }
                ) ;
        }

    }

}

