/*
 * @Author: yc
 * @Date: 2024-11-25 11:20:04
 * @LastEditors: yc
 * @LastEditTime: 2024-11-26 18:51:37
 * @Description: 菜单
 */
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Menu } from "antd"
import * as Icons from "@ant-design/icons"
import { getOpenKeys, searchRoute } from "@/utils"
import Logo from "./components/Logo"
import "./index.less"

const LayoutMenu = () => {
	const { isCollapse, menuList: reduxMenuList } = useSelector((state) => state.menu)
	const { pathname } = useLocation()
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

	// 动态渲染 Icon 图标
	const addIcon = (name) => {
		return React.createElement(Icons[name])
	}
	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList, newArr = []) => {
		menuList.forEach((item) => {
			if (!item?.children?.length) return newArr.push({ label: item.meta.title, key: item.path, icon: addIcon(item.meta.icon) })
			newArr.push({ label: item.meta.title, key: item.path, icon: addIcon(item.meta.icon), children: deepLoopFloat(item.children) })
		})
		return newArr
	}

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState([])
	useEffect(() => {
		setMenuList(deepLoopFloat(reduxMenuList))
	}, [])

	// 点击当前菜单跳转页面
	const navigate = useNavigate()
	const clickMenu = ({ key }) => {
		const route = searchRoute(key, reduxMenuList)
		if (route.isLink) window.open(route.isLink, "_blank")
		navigate(key)
	}

	return (
		<div className="menu">
			<Logo isCollapse={isCollapse}></Logo>
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
		</div>
	)
}

export default LayoutMenu
