import NProgress from "nprogress" // 进度条
import "nprogress/nprogress.css"
import axios from "axios"
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/common/serviceLoading"
import { checkStatus } from "@/common/checkStatus"
import { AxiosCanceler } from "@/common/axiosCancel"
import { setToken } from "@/redux/modules/user"
import { message } from "antd"
import { store } from "@/redux"

// 实例化请求取消器
const axiosCanceler = new AxiosCanceler()

const config = {
	// 默认请求地址
	baseURL: "",
	// 设置超时时间（10s）
	timeout: 10000,
	// 跨域时是否携带凭证
	withCredentials: true,
}

class RequestHttp {
	constructor(config) {
		// 实例化 axios
		this.service = axios.create(config)

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token, 存储到redux/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config) => {
				NProgress.start()
				// 将当前请求添加到 pending 中
				axiosCanceler.addPending(config)
				// 如果当前请求不需要显示 loading, 在 api 服务中通过指定的第三个参数 { headers: { noLoading: true } } 来控制不显示 loading
				if (!config.headers.noLoading) showFullScreenLoading()
				console.log(store.getState())

				const token = store.getState().user.token
				return { ...config, headers: { ...config?.headers, "x-access-token": token } }
			},
			(error) => {
				return Promise.reject(error)
			}
		)

		/**
		 * @description 响应拦截器
		 * 服务器返回信息 -> [拦截统一处理] -> 客户端 JS 获取到信息
		 */
		this.service.interceptors.response.use(
			(response) => {
				const { data, config } = response
				NProgress.done()
				// 在请求结束后，移除本次请求(关闭 loading)
				axiosCanceler.removePending(config)
				tryHideFullScreenLoading()
				// 登录失效（code == 599）
				if (data.code == 599) {
					store.dispatch(setToken(""))
					message.error(data.msg)
					window.location.hash = "/login"
					return Promise.reject(data)
				}
				// 全局错误信息拦截（防止下载文件时返回数据流，没有 code，直接报错）
				if (data.code && data.code !== 200) {
					message.error(data.msg)
					return Promise.reject(data)
				}
				// 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data
			},
			async (error) => {
				const { response } = error
				NProgress.done()
				tryHideFullScreenLoading()
				// 请求超时单独判断，请求超时没有 response
				if (error.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后再试")
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status)
				// 服务器结果都没有返回(可能服务器错误，可能客户端断网) 断网处理: 可以跳转到断网页面
				if (!window.navigator.onLine) window.location.hash = "/500"
				return Promise.reject(error)
			}
		)
	}

	// 常用请求方法封装
	get(url, params = {}, _object = {}) {
		return this.service.get(url, { params, ..._object })
	}
	post(url, params = {}, _object = {}) {
		return this.service.post(url, params, _object)
	}
	put(url, params = {}, _object = {}) {
		return this.service.put(url, params, _object)
	}
	delete(url, params = {}, _object = {}) {
		return this.service.delete(url, { params, ..._object })
	}
}

export default new RequestHttp(config)
