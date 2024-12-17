import userDb from '../repository/user.db';
import { User } from '../model/user';

import bcrypt from 'bcrypt';
import { AuthenticationResponse, Role, UserInput } from '../types';
import generateSWToken from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDb.getAll();
    if (!users) {
        throw new Error('No users found');
    }

    return users;
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

    const hashedPassword = await bcrypt.hash(user.password, 10);

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

    await bcrypt.compare(password, foundUser.getPassword());

    const jwt = generateSWToken({ email, role: foundUser.getRole() });

    const authresponse = {
        message: 'Authentication successful',
        token: jwt,
        email: foundUser.getEmail(),
        role: foundUser.getRole(),
    };

    return authresponse;
};

const updateUser = async (userId: number, user: UserInput): Promise<User> => {

    // const existingUser = await userDb.getByEmail({ email: user.email });

    // if (!existingUser) {
    //     throw new Error(`User with email: ${user.email} does not exist.`);
    // }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const updatedUser = new User({
        email: user.email,
        role: user.role,
        password: hashedPassword,
        shoppingcarts: [],
    });

    return userDb.updateUser(userId, updatedUser);
};

const deleteUser = async (userId: number): Promise<User> => {
    const user = await userDb.deleteUser(userId);
    if (!user) {
        throw new Error('No user found');
    }

    return user;
}

const getById = async (id: number): Promise<User> => {
    const user = await userDb.getById(id);
    if (!user) {
        throw new Error('No user found');
    }

    return user;
};

export default { getAllUsers, createUser, authenticate, getByEmail, updateUser, deleteUser, getById };
