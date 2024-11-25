/*
 * @Author: yc
 * @Date: 2024-11-24 18:32:38
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 18:33:01
 * @Description: Loading
 */
import { Spin } from "antd"
import "./index.less"

const Loading = ({ tip = "Loading" }) => {
	return <Spin tip={tip} size="large" className="request-loading" />
}

export default Loading
