import axios from "axios";
import {User, RegisterPayload, LoginPayload} from "~/types/types"

const user = ref<User | null>(null);

export function useAuth() {

    async function login(payload: LoginPayload) {
        await axios.post("/login", payload);
        await useRouter().push("/me");
    }

    async function logout() {
        await axios.post("/logout");
        user.value = null;
        await useRouter().replace("/login");
    }

    async function register(payload: RegisterPayload) {
        await axios.post("/register", payload);
        //TODO: Validate register response, if success then redirect
        await useRouter().push("/me");
    }

    async function getUser(): Promise<User | null> {
        if (user.value) {
            return user.value;
        }
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

    async function initUser(){
        user.value = await getUser();
    }

    return {
        login,
        logout,
        register,
        initUser,
        user
    }
}