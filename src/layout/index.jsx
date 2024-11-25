/*
 * @Author: yc
 * @Date: 2024-11-24 18:35:30
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 18:40:11
 * @Description: 描述
 */
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Layout } from "antd"
import { updateCollapse } from "@/store/modules/menu/action"
import { connect } from "react-redux"
import LayoutMenu from "./components/Menu"
import LayoutHeader from "./components/Header"
import "./index.less"

const LayoutIndex = (props) => {
	const { Sider, Content } = Layout
	const { isCollapse, updateCollapse } = props

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth
				if (!isCollapse && screenWidth < 1200) updateCollapse(true)
				if (!isCollapse && screenWidth > 1200) updateCollapse(false)
			})()
		}
	}

	useEffect(() => {
		listeningWindow()
	}, [])

	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			<Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
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

const mapStateToProps = (state) => state.menu
const mapDispatchToProps = { updateCollapse }
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex)
