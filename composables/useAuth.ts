import axios from "axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface User {
    email: string;
    email_verified_at?: Date;
    id: number;
    name: string;
    two_factor_confirmed_at?: Date;
    two_factor_recovery_codes?: number;
    two_factor_secret?: string;
    updated_at: Date;
    created_at: Date;
}

export function useAuth() {

    async function login(payload: LoginPayload) {
        await axios.post("/login", payload);
        await useRouter().push("/me");
    }

    async function logout() {
        await axios.post("/logout");
        await useRouter().replace("/login");
    }

    async function register(payload: RegisterPayload) {
        await axios.post("/register", payload);
        //TODO: Validate register response, if success then redirect
        await useRouter().push("/me");
    }

    async function getUser(): Promise<User | null> {

        try {
            const res = await axios.get("/user");
            const user = res.data;
            return {
                ...user,
                created_at: new Date(user.created_at),
                updated_at: new Date(user.updated_at),
                email_verified_at: user.email_verified_at ? new Date(user.email_verified_at) : null,
                two_factor_confirmed_at: user.two_factor_confirmed_at ? new Date(user.two_factor_confirmed_at) : null,
            }
        } catch (e) {
            return null;
        }
    }

    return {
        login,
        logout,
        register,
    }
}