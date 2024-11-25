/*
 * @Author: yc
 * @Date: 2024-11-24 17:08:29
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 20:43:27
 * @Description: 登录页面
 */
import { Button, Checkbox, Form, Input, message } from "antd"
import { setToken } from "@/store/modules/global/action"
import { useNavigate } from "react-router-dom"
import { HOME_URL } from "@/common/config"
import styles from "./index.module.less"
import { connect } from "react-redux"
import { useState } from "react"
import { loginApi } from "@/api/login"

const LoginForm = (props) => {
	const navigate = useNavigate()
	const { setToken } = props
	const [loading, setLoading] = useState(false)

	const onFinish = async (loginForm) => {
		const { username, password } = loginForm
		if (username === "admin" && password === "123456") {
			setLoading(true)
			const { data } = await loginApi(loginForm)
			setToken(data?.access_token)
			setLoading(false)
			message.success("登录成功！")
			//添加动态路由

			navigate(HOME_URL)
		} else {
			message.error("用户名不存在或密码错误")
		}
	}

	return (
		<div className={styles.login_bg}>
			<Form name="normal_login" className={styles.login_form} initialValues={{ remember: true }} onFinish={onFinish}>
				<Form.Item name="username" label="账号" rules={[{ required: true, message: "请输入你的账号" }]}>
					<Input placeholder="请输入你的账号" />
				</Form.Item>
				<Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入你的账号密码" }]}>
					<Input type="password" placeholder="请输入你的账号密码" />
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

const mapDispatchToProps = { setToken }
export default connect(null, mapDispatchToProps)(LoginForm)
