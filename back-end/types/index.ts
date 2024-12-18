type Role = 'user' | 'admin' | 'manager';
type Category = 'fruits' | 'vegetables' | 'dairy' | 'meat' | 'fish';

type ItemInput = {
    id?: number;
    name: string;
    price: number;
    pathToImage: string;
    category: Category;
};

type NutritionlabelInput = {
    id?: number;
    energy: number;
    fat: number;
    saturatedFats: number;
    carbohydrates: number;
    sugar: number;
    protein: number;
    salts: number;
    itemId: number | null;
};

type ShoppingcartInput = {
    id?: number;
    name: string;
    deliveryDate: Date;
    items: [];
};

type UserInput = {
    id?: number;
    email: string;
    password: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: Role;
};

export {
    Role,
    Category,
    ItemInput,
    NutritionlabelInput,
    ShoppingcartInput,
    UserInput,
    AuthenticationResponse,
};
