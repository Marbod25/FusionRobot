export interface IngredientJson {
  ingredientId: number;
  ingredientName: string;
  categoryEnum: string;
  amount: Number;
  unit: string;
}
export class Ingredient {
  private _id: number;

  constructor(
    private _name: string,
    private _categoryEnum: string,
    private _amount: Number,
    private _unit: string
  ) {}

  static fromJSON(json: IngredientJson): Ingredient {
    const ingredient = new Ingredient(
      json.ingredientName,
      json.categoryEnum,
      json.amount, 
      json.unit
    );
    ingredient._id = json.ingredientId;
    return ingredient;
  }
  
  toJSON(): IngredientJson {
    return <IngredientJson>{
      ingredientId: this._id,
      ingredientName: this._name,
      categoryEnum: this._categoryEnum,
      amount: this._amount,
      unit: this._unit
    };
  }
  get id(): number {
    return this._id;
  }
  get amount(): Number {
    return this._amount;
  }

  get categoryEnum()
  {
    return this._categoryEnum;
  }
  
  get name(): string {
    return this._name;
  }
  
  get unit(): string {
    return this._unit;
  }
}
