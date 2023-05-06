<script setup lang="ts">
import axios from "axios";

definePageMeta({
    layout: "centered",
    middleware: ["guest"]
});

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const form = ref<RegisterPayload>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

async function register(payload: RegisterPayload) {
    await axios.post("/register", payload);
    await useRouter().push("/me");
}

</script>
<template>
    <div class="register">
        <h1>Register</h1>
        <form @submit.prevent="register(<RegisterPayload>form)">
            <label>
                <div>Name</div>
                <input v-model="form.name" type="text"/>
            </label>

            <label>
                <div>Email</div>
                <input v-model="form.email" type="email"/>
            </label>

            <label>
                <div>Password</div>
                <input v-model="form.password" type="password"/>
            </label>

            <label>
                <div>Confirm Password</div>
                <input v-model="form.password_confirmation" type="password"/>
            </label>

            <button class="btn">Register</button>
        </form>

        <p>
            Already have an account?
            <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
        </p>
    </div>
</template>
