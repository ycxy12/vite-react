/*
 * @Author: yc
 * @Date: 2024-11-22 19:34:21
 * @LastEditors: yc
 * @LastEditTime: 2024-11-26 19:14:47
 * @Description: App.jsx
 */

import { ConfigProvider } from "antd"
import { BrowserRouter } from "react-router-dom"
import AuthRouter from "@/router/modules/authRouter"
import Router from "@/router/index"

const App = () => {
	return (
		<BrowserRouter>
			<ConfigProvider>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</BrowserRouter>
	)
}

export default App
