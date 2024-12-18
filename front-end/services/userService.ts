import { User } from '@types';

const login = async (email: string, password: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

const register = async (email: string, password: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

const getUserByEmail = async (email: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/email/' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const deleteUser = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const updateUser = async (userId: number, user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const getUserById = async (userId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/id/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const UserService = {
    login,
    register,
    getUserByEmail,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserById,
};

export default UserService;
