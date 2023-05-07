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

export function useAuth() {

    async function login(payload:  LoginPayload){
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

    return {
        login,
        logout,
        register,
    }
}