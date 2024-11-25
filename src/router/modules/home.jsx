import { LayoutIndex } from "@/router/constant"
import Home from "@/views/home/index"

// 首页模块
const homeRouter = [
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
]

export default homeRouter
