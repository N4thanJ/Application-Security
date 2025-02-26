import userDb from '../repository/user.db';
import { User } from '../model/user';

import bcrypt, { genSalt } from 'bcrypt';
import { AuthenticationResponse, Role, UserInput } from '../types';
import generateSWToken from '../util/jwt';

const getAllUsers = async (role: Role): Promise<User[]> => {
    if (role === 'admin') {
        return await userDb.getAll();
    } else if (role === 'manager') {
        return await userDb.getAlluserswithroleuser();
    } else {
        throw new Error('You are not authorized to view this information');
    }
};

const getByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getByEmail({ email });
    if (!user) {
        throw new Error(`No user found with email: ${email}`);
    }

    return user;
};

const createUser = async (user: UserInput): Promise<User> => {
    const existingUser = await userDb.getByEmail({ email: user.email });

    if (existingUser) {
        throw new Error(`User with email: ${user.email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(user.password, await genSalt());

    const newUser = new User({
        email: user.email,
        role: user.role,
        password: hashedPassword,
        shoppingcarts: [],
    });

    return userDb.createUser(newUser);
};

const authenticate = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<AuthenticationResponse> => {
    const foundUser = await userDb.getByEmail({ email });

    if (!foundUser) {
        throw new Error(`User with email: ${email} does not exist.`);
    }

    const bcryprRes = await bcrypt.compare(password, foundUser.getPassword());

    if (!bcryprRes) {
        throw new Error('Combination of username and password is not correct');
    }

    const jwt = generateSWToken({ email, role: foundUser.getRole() });

    const authresponse = {
        message: 'Authentication successful',
        token: jwt,
        email: foundUser.getEmail(),
        role: foundUser.getRole(),
    };

    return authresponse;
};

const updateUser = async (role: Role, userId: number, user: UserInput): Promise<User> => {
    if (role !== 'admin') {
        throw new Error('You are not authorized to update users details');
    }

    const existingUser = await userDb.getByEmail({ email: user.email });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, await genSalt());

    const updatedUser = new User({
        email: user.email,
        role: user.role,
        password: hashedPassword,
        shoppingcarts: [],
    });

    return userDb.updateUser(userId, updatedUser);
};

const deleteUser = async (role: Role, userId: number): Promise<User> => {
    if (role !== 'admin') {
        throw new Error('You are not authorized to delete users');
    }

    const user = await userDb.deleteUser(userId);
    if (!user) {
        throw new Error('No user found');
    }

    return user;
};

const getById = async (id: number): Promise<User> => {
    const user = await userDb.getById(id);
    if (!user) {
        throw new Error('No user found');
    }

    return user;
};

export default {
    getAllUsers,
    createUser,
    authenticate,
    getByEmail,
    updateUser,
    deleteUser,
    getById,
};
