/*
 * @Author: yc
 * @Date: 2024-11-22 19:34:21
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 17:50:23
 * @Description: 描述
 */
import { useState, useEffect } from "react"
import { ConfigProvider } from "antd"
import { HashRouter } from "react-router-dom"
import AuthRouter from "@/router/utils/authRouter"
import Router from "@/router/index"

const App = (props) => {
	const theme = {
		token: {
			// colorPrimary: "#b14449",
			// colorPrimaryHover: "#c75b59",
		},
	}

	return (
		<HashRouter>
			<ConfigProvider theme={theme}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	)
}

export default App
