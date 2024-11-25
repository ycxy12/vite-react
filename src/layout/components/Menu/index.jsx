/*
 * @Author: yc
 * @Date: 2024-11-25 11:20:04
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 14:42:51
 * @Description: 描述
 */
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, Spin } from "antd"
import { useSelector, useDispatch } from "react-redux" // 使用 useSelector 和 useDispatch
import { setMenuList } from "@/store/modules/action"
import { getMenuList } from "@/api/login"
import Icons from "@ant-design/icons"
import Logo from "./components/Logo"
import { getOpenKeys, searchRoute } from "@/utils"
import "./index.less"

const LayoutMenu = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch() // 获取 dispatch
	const { isCollapse, menuList } = useSelector((state) => state) // 使用 useSelector 获取 isCollapse 和 menuList
	const [selectedKeys, setSelectedKeys] = useState([pathname])
	const [openKeys, setOpenKeys] = useState([])

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname])
		if (!isCollapse) {
			setOpenKeys(getOpenKeys(pathname))
		}
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
	const addIcon = (name) => React.createElement(customIcons[name])

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList, newArr = []) => {
		menuList.forEach((item) => {
			if (!item?.children?.length) {
				return newArr.push(getItem(item.title, item.path, addIcon(item.icon)))
			}
			newArr.push(getItem(item.title, item.path, addIcon(item.icon), deepLoopFloat(item.children)))
		})
		return newArr
	}

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [loading, setLoading] = useState(false)
	const getMenuData = async () => {
		setLoading(true)
		try {
			const { data } = await getMenuList()
			if (data) {
				const formattedMenu = deepLoopFloat(data)
				dispatch(setMenuList(formattedMenu)) // 分发菜单列表到 Redux
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getMenuData()
	}, [dispatch])

	// 点击当前菜单跳转页面
	const navigate = useNavigate()
	const clickMenu = ({ key }) => {
		const route = searchRoute(key, menuList)
		if (route.isLink) window.open(route.isLink, "_blank")
		navigate(key)
	}

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo />
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				/>
			</Spin>
		</div>
	)
}

export default LayoutMenu
