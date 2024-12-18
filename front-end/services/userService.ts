import { User } from '@types';

const loggedInUser = sessionStorage.getItem('loggedInUser');
const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

const login = async (token: string, email: string, password: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
    });
};

const register = async (token: string, email: string, password: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
    });
};

const getUserByEmail = async (token: string, email: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/email/' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getAllUsers = async (token: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteUser = async (token: string, id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateUser = async (token: string, userId: number, user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
};

const getUserById = async (token: string, userId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/id/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
