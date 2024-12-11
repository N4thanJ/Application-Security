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
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + email, {
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
};

export default UserService;
