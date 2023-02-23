<template>
	<div>
		<div @click="reqHandler">发请求</div>
		Home
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { reqNav } from "@/api/home";

const reqHandler = async () => {
	console.log("发起请求了");

	const res = await reqNav();
	console.log("res", res);
};
</script>

<style scoped></style>
