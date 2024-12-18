import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.shoppingcartItems.deleteMany();
    await prisma.shoppingcart.deleteMany();
    await prisma.item.deleteMany();
    await prisma.user.deleteMany();
    await prisma.nutritionlabel.deleteMany();

    const fruits = await Promise.all([
        prisma.item.create({
            data: {
                id: 1,
                name: 'Strawberry',
                price: 4.19,
                pathToImage:
                    'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 2,
                name: 'Kaki',
                price: 3.99,
                pathToImage:
                    'https://www.fruitsnacks.be/media/cache/strip/uploads/media/5d2dc27ab1968/food-1056646-1280.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 3,
                name: 'Banana',
                price: 2.59,
                pathToImage:
                    'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 4,
                name: 'Kiwi',
                price: 1.39,
                pathToImage:
                    'https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 5,
                name: 'Blueberries',
                price: 3.49,
                pathToImage:
                    'https://images.squarespace-cdn.com/content/v1/58ebe6632994ca71ba304549/1491938746710-RE9ICCSBHSDYRFNJU5WG/image-asset.jpeg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 6,
                name: 'Plum',
                price: 1.29,
                pathToImage:
                    'https://assets.idahopreferred.com/uploads/2023/09/07170427/Plums-scaled-1.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 7,
                name: 'Dragonfruit',
                price: 4.99,
                pathToImage:
                    'https://gardenerspath.com/wp-content/uploads/2022/09/Best-Dragon-Fruit-Varieties-FB.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 8,
                name: 'Coconut',
                price: 6.79,
                pathToImage:
                    'https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg?im=Resize=(420,420)',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 9,
                name: 'Mango',
                price: 3.79,
                pathToImage:
                    'https://www.natural-cure.org/wp-content/uploads/diet-and-nutrition-Mango-The-King-of-Fruit-has-Incredible-Health-Benefits.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 10,
                name: 'Papaya',
                price: 4.29,
                pathToImage:
                    'https://media.post.rvohealth.io/wp-content/uploads/2020/09/papaya-benefits-732x549-thumbnail.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 11,
                name: 'Passion Fruit',
                price: 5.49,
                pathToImage:
                    'https://www.health.com/thmb/VAp6rYEuFSjs-pr32reGxu_nflo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1304948489-2ce87241ca6943e4a3d617f74aa7aaa8.jpg',
                category: 'fruits',
            },
        }),
    ]);

    const vegetables = await Promise.all([
        prisma.item.create({
            data: {
                id: 12,
                name: 'Spinach',
                price: 3.49,
                pathToImage:
                    'https://cdn.britannica.com/30/82530-050-79911DD4/Spinach-leaves-vitamins-source-person.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 13,
                name: 'Carrot',
                price: 1.79,
                pathToImage:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTba3FfUO6CI9cySnHdGt1roZY60bdUInxLXQ&s',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 14,
                name: 'Bell Pepper',
                price: 2.49,
                pathToImage:
                    'https://images.healthshots.com/healthshots/en/uploads/2024/07/24112903/1-40.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 15,
                name: 'Cucumber',
                price: 1.99,
                pathToImage:
                    'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/cucumber.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 16,
                name: 'Tomato',
                price: 2.29,
                pathToImage:
                    'https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 17,
                name: 'Cauliflower',
                price: 3.29,
                pathToImage:
                    'https://media-cdn2.greatbritishchefs.com/media/xuaop4pn/cauliflower.whqc_1426x713q80.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 18,
                name: 'Eggplant',
                price: 2.79,
                pathToImage:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCg8ZVPiq_njTN62seBuHJVhAOXztBTsM2Ug&s',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 19,
                name: 'Zucchini',
                price: 2.59,
                pathToImage:
                    'https://chefsmandala.com/wp-content/uploads/2018/03/Squash-Zucchini.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 20,
                name: 'Asparagus',
                price: 4.49,
                pathToImage:
                    'https://foolproofliving.com/wp-content/uploads/2022/02/how-to-store-fresh-asparagus.jpg',
                category: 'vegetables',
            },
        }),
        prisma.item.create({
            data: {
                id: 21,
                name: 'Broccoli',
                price: 2.99,
                pathToImage:
                    'https://media.30seconds.com/tip/lg/Easy-Zesty-Marinated-Broccoli-Recipe-Eat-Fresh-Healthy-Foo-53389-a0696bc290-1670531074.jpg',
                category: 'vegetables',
            },
        }),
    ]);

    const dairy = await Promise.all([
        prisma.item.create({
            data: {
                id: 22,
                name: 'Yogurt',
                price: 2.79,
                pathToImage: 'https://cdn.carrefour.eu/1200_04961127_T1.webp',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 23,
                name: 'Cheese',
                price: 5.49,
                pathToImage:
                    'https://dfwblobstorage.blob.core.windows.net/ewcmediacontainer/eatwisconsincheese/media/content/cheesemasters-2019/swiss-cheese-header_2.jpg',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 24,
                name: 'Butter',
                price: 4.29,
                pathToImage:
                    'https://www.allrecipes.com/thmb/YEHvUygNdvsUwzKttGh314d9n1M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sticks-of-butter-photo-by-twoellis-GettyImages-149134517-resized-3911123142a141eca2340a4bb63e0869.jpg',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 25,
                name: 'Cream',
                price: 3.59,
                pathToImage:
                    'https://www.seriouseats.com/thmb/Nkx7nmi5D6fKrHmYkLopUwqTXrs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20221205-HowToWhipCream-AmandaSuarez-26-6600ee54f8dd466f9f2f5269d24afcb6.jpg',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 26,
                name: 'Sour Cream',
                price: 2.99,
                pathToImage:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXYR6rZ1kFnl1qO0T904_WY80CPJe7LwY5Q&s',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 27,
                name: 'Cottage Cheese',
                price: 3.29,
                pathToImage:
                    'https://cheesemaking.com/cdn/shop/products/cottage-cheese-1.jpg?crop=center&height=1200&v=1529434175&width=1200',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 28,
                name: 'Kefir',
                price: 4.59,
                pathToImage:
                    'https://cdn.shopify.com/s/files/1/0077/0759/0720/files/milk-kefir-in-bowl.png?v=1664544486',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 29,
                name: 'Heavy Cream',
                price: 3.79,
                pathToImage: 'https://www.noracooks.com/wp-content/uploads/2022/04/144A8456.jpg',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 30,
                name: 'Goat Cheese',
                price: 5.99,
                pathToImage:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToAQtMBQp2FFxiwKh5gv7PnDWli0tUuATRUA&s',
                category: 'dairy',
            },
        }),
        prisma.item.create({
            data: {
                id: 31,
                name: 'Milk',
                price: 3.99,
                pathToImage:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/004-soymilk.jpg/640px-004-soymilk.jpg',
                category: 'dairy',
            },
        }),
    ]);

    const meat = await Promise.all([
        prisma.item.create({
            data: {
                id: 32,
                name: 'Ground Beef',
                price: 7.49,
                pathToImage:
                    'https://embed.widencdn.net/img/beef/4hh1pywcnj/800x600px/Grind_Fine_85.psd?keep=c&u=7fueml',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 33,
                name: 'Pork Chops',
                price: 5.79,
                pathToImage:
                    'https://www.seriouseats.com/thmb/7G55_V8fyOm2Z7JMFAz39W7Gvdc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__02__20160208-sous-vide-pork-chop-guide-food-lab-02-10d7ecdd7c2e42ca94ff188f814ece48.jpg',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 34,
                name: 'Lamb Shoulder',
                price: 8.99,
                pathToImage:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfVt_ckUGSaLgoHUQIx6VV056ccaqNBnCww&s',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 35,
                name: 'Turkey Breast',
                price: 6.49,
                pathToImage:
                    'https://butchersfayre.co.uk//app/uploads/2023/09/Single-Turkey-Breast-scaled.jpeg',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 36,
                name: 'Beef Steak',
                price: 9.99,
                pathToImage:
                    'https://freezedrywholesalers.com/cdn/shop/products/Sirloin-Steak_900x.jpg?v=1598760827',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 37,
                name: 'Chicken Thighs',
                price: 5.29,
                pathToImage:
                    'https://d2ht9oj9id87jp.cloudfront.net/v1/images/5693/thumb/w1900_h750_rcx0_rcy241.01052631579_rcw1200_rch631.57894736842_ciw1200_cih960/chicken-thighs-raw-product-blackboxmeats.jpeg',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 38,
                name: 'Bacon',
                price: 7.29,
                pathToImage:
                    'https://images-prod.healthline.com/hlcmsresource/images/AN_images/can-you-eat-bacon-raw-1296x728-feature.jpg',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 39,
                name: 'Sausages',
                price: 6.79,
                pathToImage:
                    'https://media02.stockfood.com/largepreviews/MzgxMTY5Mjcz/12295783-Uncooked-English-breakfast-sausages-bangers-on-cutting-board.jpg',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 40,
                name: 'Duck Breast',
                price: 10.99,
                pathToImage:
                    'https://bromfieldsbutchers.co.uk/cdn/shop/files/barbary-duck-breasts-2x220g-240g-817_512x342.webp?v=1729033562',
                category: 'meat',
            },
        }),
        prisma.item.create({
            data: {
                id: 41,
                name: 'Chicken Breast',
                price: 6.99,
                pathToImage:
                    'https://www.momswhothink.com/wp-content/uploads/2023/05/shutterstock-1915431781-huge-licensed-scaled.jpg',
                category: 'meat',
            },
        }),
    ]);

    const fish = await Promise.all([
        prisma.item.create({
            data: {
                id: 42,
                name: 'Tuna',
                price: 9.99,
                pathToImage:
                    'https://ocwildseafood.com/cdn/shop/articles/Ahi_Tuna_Sashimi_Seafood_Recipe_1024x.jpg?v=1591853624',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 43,
                name: 'Cod',
                price: 8.49,
                pathToImage:
                    'https://media.istockphoto.com/id/1464120963/photo/fillets-of-codfish-raw-cod-fish-meat-black-background-top-view.jpg?s=612x612&w=0&k=20&c=5TYeC04N7YAWJaTJzM5lVFMRoGLLUlOrNjvaAW5eAcc=',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 44,
                name: 'Mackerel',
                price: 7.29,
                pathToImage:
                    'https://4pawsraw.co.uk/wp-content/uploads/2021/05/rsz_frozen-mackerel.jpg',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 45,
                name: 'Trout',
                price: 10.49,
                pathToImage:
                    'https://media.istockphoto.com/id/1423626140/photo/raw-sea-trout-fresh-fish-on-a-plate-with-herbs-black-background-top-view.jpg?s=612x612&w=0&k=20&c=T7CPQihZB4AvdzeFLNmaWOvpOL-zedMAQ2eDKfEoSCc=',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 46,
                name: 'Sardines',
                price: 6.79,
                pathToImage:
                    'https://s.yimg.com/ny/api/res/1.2/H_xUKo3Smet6akkz5ZRckQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzY-/https://media.zenfs.com/en/food_republic_969/4701777d965f492fa17598d01b51c60a',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 47,
                name: 'Halibut',
                price: 14.99,
                pathToImage:
                    'https://bradleysfish.com/wp-content/uploads/2021/05/Halibut-170-200g-1-Custom.jpg',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 48,
                name: 'Sea Bass',
                price: 11.99,
                pathToImage:
                    'https://media.istockphoto.com/id/1583284991/photo/raw-seabass-with-ingredients-and-seasonings-like-basil-lemon-salt-pepper-cherry-tomatoes-and.jpg?s=612x612&w=0&k=20&c=EwtEL-mE8lYXh1xMkIK-DQyOzKR77XJRpXUvQEFP7cU=',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 49,
                name: 'Tilapia',
                price: 7.49,
                pathToImage:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQox-4spxhE--u5ChJEvgcn7HyLtbgBr1AKYw&s',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 50,
                name: 'Red Snapper',
                price: 12.49,
                pathToImage:
                    'https://www.panseas.com/pub/media/catalog/product/cache/c2b0ec938a22fcdaba7c15147ba4db25/i/m/img_3526.jpg',
                category: 'fish',
            },
        }),
        prisma.item.create({
            data: {
                id: 51,
                name: 'Salmon',
                price: 12.99,
                pathToImage:
                    'https://www.tasteofhome.com/wp-content/uploads/2023/01/GettyImages-958307980-e1674241057463.jpg',
                category: 'fish',
            },
        }),
    ]);

    await Promise.all([
        prisma.user.create({
            data: {
                id: 0,
                email: 'john.doe@mail.com',
                password: await bcrypt.hash('John123!', 12),
                role: 'user',
                shoppingcarts: {
                    create: {
                        id: 0,
                        name: 'Shoppingcart 1',
                        deliveryDate: new Date('2026-12-24'),
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                id: 1,
                email: 'jane.doe@mail.com',
                password: await bcrypt.hash('Jane123!', 12),
                role: 'admin',
                shoppingcarts: {
                    create: {
                        id: 1,
                        name: 'Shoppingcart 2',
                        deliveryDate: new Date('2026-09-16'),
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                id: 2,
                email: 'josh.doe@mail.com',
                password: await bcrypt.hash('Josh123!', 12),
                role: 'manager',
            },
        }),
    ]);

    const shoppingcartItems = await Promise.all([
        prisma.shoppingcartItems.create({
            data: {
                shoppingcartId: 0,
                itemId: fruits[0].id,
            },
        }),
        prisma.shoppingcartItems.create({
            data: {
                shoppingcartId: 1,
                itemId: fruits[0].id,
            },
        }),
    ]);

    await Promise.all([
        prisma.shoppingcart.update({
            where: { id: 0 },
            data: {
                items: {
                    connect: [
                        { shoppingcartId_itemId: { shoppingcartId: 0, itemId: fruits[0].id } },
                    ],
                },
            },
        }),
        prisma.shoppingcart.update({
            where: { id: 1 },
            data: {
                items: {
                    connect: [
                        { shoppingcartId_itemId: { shoppingcartId: 1, itemId: fruits[0].id } },
                    ],
                },
            },
        }),
    ]);

    console.log('Seed data created successfully');
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
