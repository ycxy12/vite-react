/*
 * @Author: yc
 * @Date: 2024-11-24 18:40:37
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 07:44:56
 * @Description: 描述
 */
import { Navigate, useRoutes } from "react-router-dom"
import Login from "@/views/login/index"
import { LayoutIndex } from "@/router/constant"
import Home from "@/views/home/index"

// * 导入所有router
const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true })
console.log(metaRouters)
// * 处理路由
export const routerArray = []
Object.keys(metaRouters).forEach((item) => {
	Object.keys(metaRouters[item]).forEach((key) => {
		routerArray.push(...metaRouters[item][key])
	})
})

export const rootRouter = [
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login",
		},
	},
	// ...routerArray,
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Home />,
				meta: {
					requiresAuth: true,
					title: "首页",
					key: "home",
				},
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
]

const Router = () => {
	const routes = useRoutes(rootRouter)
	return routes
}

export default Router
