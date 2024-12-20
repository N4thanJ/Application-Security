export type Role = 'user' | 'admin' | 'manager';
export type Category = 'fruits' | 'vegetables' | 'dairy' | 'meat' | 'fish';

export type User = {
    id?: number;
    email: string;
    role: Role;
    password?: string;
    shoppingcarts?: Shoppingcart[];
};

export type Item = {
    id?: number;
    name: string;
    price: number;
    pathToImage: string;
    category: Category;
    nutritionlabel?: Nutritionlabel;
};

export type Nutritionlabel = {
    id?: number;
    energy: number;
    fat: number;
    saturatedFats: number;
    carbohydrates: number;
    sugar: number;
    protein: number;
    salts: number;
    item?: Item;
};

export type Shoppingcart = {
    id?: number;
    name: string;
    deliveryDate: Date;
    items: ShoppingcartItem[];
};

export type ShoppingcartItem = {
    item: Item;
    quantity: number;
};

export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};

export default {};
