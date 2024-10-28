import { Item } from './item';
import { User } from './user';

export class Shoppingcart {
    private id?: number | undefined;
    private name: string;
    private deliveryDate: Date;
    private user!: User;
    private items: Item[] = [];

    constructor(shoppingcart: { id?: number; name: string; deliveryDate: Date }) {
        this.validate(shoppingcart);
        this.id = shoppingcart.id;
        this.name = shoppingcart.name;
        this.deliveryDate = shoppingcart.deliveryDate;
    }

    validate(shoppingcart: { name: string; deliveryDate: Date }) {
        if (!shoppingcart.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!shoppingcart.deliveryDate) {
            throw new Error('Delivery date is required');
        }
        const deliveryDate = new Date(shoppingcart.deliveryDate);
        if (deliveryDate.getTime() < Date.now()) {
            throw new Error('Delivery date should be after today');
        }
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(item: Item) {
        if (!this.items.includes(item)) {
            throw new Error('This item does not exist in this shopping cart');
        }
        this.items.splice(this.items.indexOf(item), 1);
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    getUser(): User {
        return this.user;
    }

    getItems(): Item[] {
        return this.items;
    }

    setUser(user: User) {
        this.user = user;
    }

    equals(shoppingcart: Shoppingcart): boolean {
        return (
            this.id === shoppingcart.getId() &&
            this.name === shoppingcart.getName() &&
            this.deliveryDate === shoppingcart.getDeliveryDate() &&
            this.user === shoppingcart.getUser()
        );
    }
}
