import { createRouter, createWebHistory } from "vue-router";
import { staticRoutes } from "@/router/routes";

const router = createRouter({
	history: createWebHistory(),
	routes: staticRoutes,
	scrollBehavior() {
		// vue-router@4 中的 left，top 对应 vue-router@3 中的 x，y
		return { top: 0, left: 0 };
	},
});

// 导出路由
export default router;
