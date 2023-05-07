<script setup>
import {useAuth} from "~/composables/useAuth";

const {logout} = useAuth();
logout();
</script>

<template>
    <div>Logging Out...</div>
</template>
