import axios from 'axios';

// interface UserCredentials {
//     username: string;
//     password: string;
// }

interface User {
    username: string;
    password: string;  
    token: string;
}

// const dummyUsers: User[] = [
//     { username: "test", password: "ABC123#", token: "fake-token" },
//     { username: "user.123ASD#",password: "123ASD#", token: "token1" },
//     { username: "user.S22411#",password: "S22411#", token: "token2" },
// ];

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/users/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function loginUser(user_name: string, user_pass: string): Promise<{ success: boolean; message?: string }> {
    try {
        const response = await api.post('/login', { user_name, user_pass });

        if (response.data.token) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("user", response.data.user);
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return { success: false, message: error.response.data.detail };
        } else {
            return { success: false, message: "An unexpected error occurred" };
        }
    }
    return { success: false, message: "Unknown error" };
}


// export async function registerUser(username: string, password: string): Promise<boolean> {
//     try {
//         const response = await api.post('/register', { username, password });
//         console.log("User registered:", response.data);
//         return true;
//     } catch (error) {
//         console.error("Registration failed:", error);
//     }
//     return false;
// }

// export async function loginUser(username: string, password: string): Promise<boolean> {
//     // Simulasi autentikasi
//     const user = dummyUsers.find(user => user.username === username && user.password === password);
//     if (user) {
//         sessionStorage.setItem("token", user.token);
//         return true;
//     }
//     return false;
// }

export async function registerUser(username: string, password: string): Promise<boolean> {
    // Simulasi pendaftaran pengguna
    console.log("User registered:", { username, password });
    return true;
}

export function isAuthenticated(): boolean {
    return !!getToken();
}

export function logoutUser(): void {
    sessionStorage.removeItem("token");
}

export function getToken(): string | null {
    return sessionStorage.getItem("token");
}

// export function getUser(): {
//     username: string;
// } | null {
//     const token = getToken();
//     const user = dummyUsers.find(user => user.token === token);
//     if (user) {
//         return { username: user.username };
//     }
//     return null;
// }
export async function getUser() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No token found");
    }

    const response = await api.get("/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.user;
}