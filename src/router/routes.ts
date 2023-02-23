import type { RouteRecordRaw } from "vue-router";
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由）
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/home/index.vue"),
	},
];
