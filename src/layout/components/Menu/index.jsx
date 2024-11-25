/*
 * @Author: yc
 * @Date: 2024-11-24 18:35:30
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 18:37:40
 * @Description: 描述
 */
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, Spin } from "antd"
import { getOpenKeys, searchRoute } from "@/utils"
import { setMenuList } from "@/store/modules/menu/action"
import { getMenuList } from "@/api/login"
import { connect } from "react-redux"
import Icons from "@ant-design/icons"
import Logo from "./components/Logo"
import "./index.less"

const LayoutMenu = (props) => {
	const { pathname } = useLocation()
	const { isCollapse } = props
	const [selectedKeys, setSelectedKeys] = useState([pathname])
	const [openKeys, setOpenKeys] = useState([])

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname])
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname))
	}, [pathname, isCollapse])

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
		const latestOpenKey = openKeys[openKeys.length - 1]
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
		setOpenKeys([latestOpenKey])
	}

	// 定义 menu 类型

	const getItem = (label, key, icon, children, type = "group") => {
		return { key, icon, children, label, type }
	}

	// 动态渲染 Icon 图标
	const customIcons = Icons
	const addIcon = (name) => {
		return React.createElement(customIcons[name])
	}

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList, newArr = []) => {
		menuList.forEach((item) => {
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon)))
			newArr.push(getItem(item.title, item.path, addIcon(item.icon), deepLoopFloat(item.children)))
		})
		return newArr
	}

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState([])
	const [loading, setLoading] = useState(false)
	const getMenuData = async () => {
		setLoading(true)
		try {
			const { data } = await getMenuList()
			if (!data) return
			setMenuList(deepLoopFloat(data))
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getMenuData()
	}, [])

	// 点击当前菜单跳转页面
	const navigate = useNavigate()
	const clickMenu = ({ key }) => {
		const route = searchRoute(key, props.menuList)
		if (route.isLink) window.open(route.isLink, "_blank")
		navigate(key)
	}

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				></Menu>
			</Spin>
		</div>
	)
}

const mapStateToProps = (state) => state.menu
const mapDispatchToProps = { setMenuList }
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu)
