import React from "react"
import lazyLoad from "@/router/utils/lazyLoad"

// 数据大屏模块
const dataScreenRouter = [
	{
		path: "/dataScreen",
		element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index"))),
		meta: {
			requiresAuth: true,
			title: "数据大屏",
			key: "dataScreen",
		},
	},
]

export default dataScreenRouter
