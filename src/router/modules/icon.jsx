import React from "react"
import lazyLoad from "@/router/utils/lazyLoad"
import { LayoutIndex } from "@/router/constant"

//icon svg 图标
const SvgIcon = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: "/icon",
                element: lazyLoad(React.lazy(() => import("@/views/Icon/index"))),
                meta: {
                    requiresAuth: true,
                    title: "图标",
                    key: "icon",
                },
            },
        ],
    },
]

export default SvgIcon
