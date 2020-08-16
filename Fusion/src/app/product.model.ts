import {IngredientJson, Ingredient } from './ingredient.model';

export interface ProductJson {
  productId: number;
  productName: string;
  category: string;
  ingredients: IngredientJson[];
}
export class Product {
  private _id: number;

  constructor(
    private _name: string,
    private _category: string,
    private _ingredients = new Array<Ingredient>()
  ) {}

  static fromJSON(json: ProductJson): Product {
    const product = new Product(
      json.productName,
      json.category,
      json.ingredients.map(Ingredient.fromJSON)
    );
    product._id = json.productId;
    return product;
  }

  toJSON(): ProductJson {
    return <ProductJson>{
      productName: this._name,
      category: this._category,
      ingredients: this._ingredients.map(i => i.toJSON())
    };
  }
  get id(): number {
    return this._id;
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  get name(): string {
    return this._name;
  }

  get category(): string{
    return this._category;
  }

  get imageName(): string {
    return this._name.replace(/\s/g, "");
  }
}
