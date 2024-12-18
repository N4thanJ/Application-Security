import { User } from '../model/user';
import db from './db';

const getAll = async (): Promise<User[]> => {
    try {
        const userPrisma = await db.user.findMany({
            include: {
                shoppingcarts: {
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
            },
        });
        console.log('Raw userPrisma:', JSON.stringify(userPrisma, null, 2));

        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all users');
    }
};

const getByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await db.user.findUnique({
            where: {
                email,
            },
            include: {
                shoppingcarts: {
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
            },
        });

        if (!userPrisma) {
            return null;
        }

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get user by email');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await db.user.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
            },

            include: {
                shoppingcarts: {
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not create user');
    }
};

const updateUser = async (userId: number, user: User): Promise<User> => {
    try {
        const userPrisma = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            },
            include: {
                shoppingcarts: {
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not update user');
    }
};

const deleteUser = async (userId: number): Promise<User> => {
    try {
        await db.shoppingcart.deleteMany({
            where: {
                userId: userId,
            },
        });

        const userPrisma = await db.user.delete({
            where: {
                id: userId,
            },
            include: {
                shoppingcarts: {
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not delete user');
    }
};

const getById = async (id: number): Promise<User> => {
    try {
        const userPrisma = await db.user.findUnique({
            where: {
                id,
            },
            include: {
                shoppingcarts: {
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
            },
        });

        if (!userPrisma) {
            throw new Error('No user found');
        }

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get user by id');
    }
};

export default {
    getAll,
    getByEmail,
    createUser,
    updateUser,
    deleteUser,
    getById,
};
