/*
 * @Author: yc
 * @Date: 2024-11-24 18:24:36
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 20:33:54
 * @Description: 描述
 */
import request from "@/common/axios"
import routes from "@/router/routes.json"
/**
 * @name 登录模块
 */

// * 用户登录接口
export const loginApi = (params) => {
	return request.post("/api/login", params)
}

// * 获取菜单列表
export const getMenuList = () => {
	return routes
}
