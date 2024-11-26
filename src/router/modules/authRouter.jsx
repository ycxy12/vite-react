/*
 * @Author: yc
 * @Date: 2024-11-25 11:20:04
 * @LastEditors: yc
 * @LastEditTime: 2024-11-26 19:29:06
 * @Description: 路由守卫组件
 */
import { useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { HOME_URL } from "@/common/config"

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props) => {
	const { token } = useSelector((state) => state.user)
	const { pathname } = useLocation()

	// * 判断是否有Token
	if (token) {
		// * 如果有token,并且进入login页面
		if (pathname === "/login") return <Navigate to={HOME_URL} />
	} else {
		if (pathname !== "/login") return <Navigate to="/login" replace />
	}

	return props.children
}

export default AuthRouter
