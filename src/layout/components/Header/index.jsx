/*
 * @Author: yc
 * @Date: 2024-11-24 18:35:30
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 07:46:20
 * @Description: 描述
 */
import { Layout } from "antd"
import AvatarIcon from "./components/AvatarIcon"
import CollapseIcon from "./components/CollapseIcon"
import "./index.less"

const LayoutHeader = () => {
    const { Header } = Layout

    return (
        <Header>
            <div className="header-lf">
                <CollapseIcon />
            </div>
            <div className="header-ri">
                <span className="username">Admin</span>
                <AvatarIcon />
            </div>
        </Header>
    )
}

export default LayoutHeader
