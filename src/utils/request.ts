import axios, { type AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
// import pinia from "@/stores/index";
// import { useUserInfoStore } from "../stores/userInfo";

/* 定义response对象的data接口 */
interface ResponseData<T> {
	code: number;
	data: T;
	message: string;
}

// 配置新建一个 axios 实例
const service = axios.create({
	// 新的 axios 实例对象的请求基础url
	// import.meta.env.VITE_API_URL => 读取项目环境变量配置文件（.env.development，.env.production）中的内容，如果我们系统中没有配置环境变量信息，则默认是 development
	baseURL: import.meta.env.VITE_API_URL,
	// 请求超时设置
	timeout: 50000,
});

// 添加请求拦截器
// 请求拦截器是在每次请求发出之前执行，
service.interceptors.request.use(config => {
	// 对发送的数据进行修正的
	// 可以把请求的 token 放在这里进行处理

	// config.headers = {
	// 	token: useUserInfoStore(pinia).token,
	// };

	return config;
});

// 添加响应拦截器
service.interceptors.response.use(
	/* 约束一下response */
	async (response: AxiosResponse<ResponseData<any>>) => {
		// response: axios 封装后的响应数据，后端返回的具体数据是被封装在 response 对象的 data 属性下

		// 对响应数据做点什么
		const res = response.data;
		// 根据 code 判断后端返回的状态，具体看你们各自的后端说明
		if (res.code !== 20000 && res.code !== 200) {
			/* 成功数据的code值为20000/200 */
			// 统一的错误提示
			ElMessage({
				message: (typeof res.data == "string" && res.data) || res.message || "Error",
				type: "error",
				duration: 5 * 1000,
			});

			// `token` 过期或者账号已在别处登录
			// 因为接口的变更，res.code === 20001 才是 token 有问题
			if (response.status === 401 || res.code === 20001) {
				// const storeUserInfo = useUserInfoStore(pinia);
				// await storeUserInfo.reset();
				// window.location.href = "/"; // 去登录页
				ElMessageBox.alert("发起请求失败", "提示", {})
					.then(() => {})
					.catch(() => {});
			}
			return Promise.reject(service.interceptors.response);
		} else {
			return res.data; /* 返回成功响应数据中的data属性数据 */
		}
	},
	error => {
		// 对响应错误做点什么
		if (error.message.indexOf("timeout") != -1) {
			ElMessage.error("网络超时");
		} else if (error.message == "Network Error") {
			ElMessage.error("网络连接错误");
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error("接口路径找不到");
		}
		return Promise.reject(error);
	}
);

export default service;
