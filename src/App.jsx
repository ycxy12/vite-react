/*
 * @Author: yc
 * @Date: 2024-11-22 19:34:21
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 17:50:23
 * @Description: App
 */

import { ConfigProvider } from "antd"
import { HashRouter } from "react-router-dom"
import AuthRouter from "@/router/utils/authRouter"
import Router from "@/router/index"

const App = () => {
	return (
		<HashRouter>
			<ConfigProvider>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	)
}

export default App
