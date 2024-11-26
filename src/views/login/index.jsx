/*
 * @Author: yc
 * @Date: 2024-11-24 17:08:29
 * @LastEditors: yc
 * @LastEditTime: 2024-11-26 17:48:25
 * @Description: 登录页面
 */
import { Button, Checkbox, Form, Input, message } from "antd"
import { setToken } from "@/redux/modules/user"
import { useNavigate } from "react-router-dom"
import { HOME_URL } from "@/common/config"
import styles from "./index.module.less"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { loginApi } from "@/api/login"
import { getMenuList } from "@/api/login"
import { setMenuList } from "@/redux/modules/menu"

const LoginForm = () => {
	const dispatch = useDispatch() // 使用 useDispatch 获取 dispatch
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const onFinish = async (loginForm) => {
		const { username, password } = loginForm
		if (username === "admin" && password === "123456") {
			setLoading(true)
			// const { data } = await loginApi(loginForm)
			let data = {
				access_token: "1234567890",
				userName: "Admin",
				userId: "123456",
			}
			dispatch(setToken(data?.access_token))
			setLoading(false)
			message.success("登录成功！")

			//添加动态路由
			const res = await getMenuList()
			await dispatch(setMenuList(res.data))

			navigate(HOME_URL)
		} else {
			message.error("用户名不存在或密码错误")
		}
	}

	return (
		<div className={styles.login_bg}>
			<Form name="normal_login" className={styles.login_form} initialValues={{ remember: true }} onFinish={onFinish}>
				<Form.Item name="username" label="账号" rules={[{ required: true, message: "请输入你的账号" }]}>
					<Input placeholder="请输入你的账号" autoComplete="username" />
				</Form.Item>
				<Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入你的账号密码" }]}>
					<Input autoComplete="new-password" type="password" placeholder="请输入你的账号密码" />
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>记住密码</Checkbox>
					</Form.Item>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
						登 录
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginForm
