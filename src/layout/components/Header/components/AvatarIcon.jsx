/*
 * @Author: yc
 * @Date: 2024-11-24 18:35:30
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 20:28:47
 * @Description: 头像
 */
import { Avatar, Modal, Dropdown, message } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux" // 使用 useDispatch
import { setToken } from "@/redux/modules/user"
import avatar from "@/assets/images/avatar.png"
import { HOME_URL } from "@/common/config"

const AvatarIcon = () => {
	const dispatch = useDispatch() // 使用 useDispatch 获取 dispatch
	const navigate = useNavigate()

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				dispatch(setToken("")) // 使用 dispatch 来触发 setToken
				message.success("退出登录成功！")
				navigate("/login")
			},
		})
	}

	// 下拉菜单
	const items = [
		{
			key: "1",
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate(HOME_URL),
		},
		{
			key: "2",
			label: <span className="dropdown-item">个人信息</span>,
		},
		{
			key: "3",
			label: <span className="dropdown-item">修改密码</span>,
		},
		{
			type: "divider",
		},
		{
			key: "4",
			label: <span className="dropdown-item">退出登录</span>,
			onClick: logout,
		},
	]

	return (
		<Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
			<Avatar size="large" src={avatar} />
		</Dropdown>
	)
}

export default AvatarIcon
