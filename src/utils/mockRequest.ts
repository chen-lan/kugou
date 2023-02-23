/**
 * 此文件对axios进行二次封装，封装的功能如下
 *  1、api基础路径的默认带上
 *  2、添加进度条的功能
 *  3、对响应回来的数据进行处理，直接返回需要的data数据
 *  4、对于错误统一处理，避免每个组件都要对错误进行捕获
 */
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const mockAjax = axios.create({
	baseURL: "/mock",
	timeout: 10000,
});

// 添加请求拦截器
mockAjax.interceptors.request.use(function (config) {
	// config是请求配置对象，里面包含所有的配置信息，包括请求头、请求行、请求体、工行
	// 进度条开始
	nProgress.start();
	// 在发送请求之前做些什么
	return config;
});

// 添加响应拦截器
mockAjax.interceptors.response.use(
	function (response) {
		// resonse是请求响应回来的对象数据，里面包请求的所有数据
		// 请求成功进度条关闭
		nProgress.done();
		// 对响应数据进行筛选
		return response.data;
		// return response;
	},
	function (error) {
		// 请求失败进度条关闭
		nProgress.done();

		// 统一处理报错信息
		// 超出 2xx 范围的状态码都会触发该函数。
		const errorStatus = error.response.status.toString().slice(0, 1);
		if (errorStatus === "3") {
			alert(error.response.statusText);
		} else if (errorStatus === "4") {
			alert(error.response.statusText);
		} else if (errorStatus === "5") {
			alert(error.response.statusText);
		}
		// 对响应错误做点什么
		return new Promise(() => {});
	}
);

export default mockAjax;
