/*
 * @Author: yc
 * @Date: 2024-11-24 18:35:30
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 20:27:40
 * @Description: Layout
 */
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux" // 使用 Redux Toolkit 的钩子
import { Layout } from "antd"
import { updateCollapse } from "@/redux/modules/menu"
import LayoutMenu from "./components/Menu"
import LayoutHeader from "./components/Header"
import "./index.less"

const LayoutIndex = () => {
	const { Sider, Content } = Layout
	const dispatch = useDispatch() // 使用 dispatch
	const { isCollapse } = useSelector((state) => state.menu) // 获取 Redux store 中的 isCollapse

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth
				if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true))
				if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false))
			})()
		}
	}

	useEffect(() => {
		listeningWindow()
	}, [isCollapse]) // 监听 isCollapse 变化，避免多次绑定

	return (
		<section className="container">
			<Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<Content>
					<Outlet></Outlet>
				</Content>
			</Layout>
		</section>
	)
}

export default LayoutIndex
